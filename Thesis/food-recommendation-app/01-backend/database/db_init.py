from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from database.config import Config
from werkzeug.security import generate_password_hash
import os
import subprocess
import logging
from pathlib import Path

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger('db_init')

# Check if we should drop all tables (for development/testing)
RESET_DATABASE = False  

# Path to SQL dump file - with absolute path to be sure
SQL_FILE = Path(__file__).parent.parent / "data" / "database.sql"
SQL_FILE = SQL_FILE.resolve()  # Convert to absolute path
# Create data directory if it doesn't exist
os.makedirs(Path(__file__).parent.parent / "data", exist_ok=True)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    role = db.Column(db.String(10), nullable=False, default="user")
    date_of_birth = db.Column(db.Date, nullable=False)  

class UserFoodLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id", ondelete="CASCADE"))
    
    # Input information
    mood = db.Column(db.String(50), nullable=False)  # User's emotion
    meal_time = db.Column(db.String(50))  # Meal time (Breakfast, Lunch, etc.)
    food_type = db.Column(db.String(50))  # Food type preference
    
    # Recommendation results
    recommended_food = db.Column(db.String(255))  # Recommended food
    
    # User feedback
    feedback_rating = db.Column(db.Integer)  # User rating (1-5 stars)
    
    # Metadata
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

def seed_default_users():
    admin_email = "admin@example.com"
    user_email = "user@example.com"

    admin = User.query.filter_by(email=admin_email).first()
    user = User.query.filter_by(email=user_email).first()

    if not admin:
        admin_password_hash = generate_password_hash("admin123", method="pbkdf2:sha256")  
        new_admin = User(
            name="Admin",
            email=admin_email,
            password_hash=admin_password_hash,
            role="admin",
            date_of_birth="1990-01-01"
        )
        db.session.add(new_admin)

    if not user:
        user_password_hash = generate_password_hash("123456", method="pbkdf2:sha256") 
        new_user = User(
            name="User",
            email=user_email,
            password_hash=user_password_hash,
            role="user",
            date_of_birth="2000-01-01"
        )
        db.session.add(new_user)

    db.session.commit()
    logger.info("✅ Default Admin & User accounts added!")

def check_tables_exist():
    """Check if tables exist in the database"""
    tables = ["user", "user_food_log"]
    
    try:
        # Get all existing tables in the database
        inspector = db.inspect(db.engine)
        existing_tables = inspector.get_table_names()
        
        # Check if all required tables exist
        for table in tables:
            if table not in existing_tables:
                logger.info(f"Table '{table}' does not exist")
                return False
        
        return True
    
    except Exception as e:
        logger.error(f"Error checking tables: {e}")
        return False

def find_pg_bin_path(binary_name):
    """Find path to PostgreSQL binary on Windows"""
    if os.name != 'nt':  # Not Windows
        logger.info(f"Not on Windows, using system '{binary_name}'")
        return binary_name
        
    # Check common installation directories
    possible_paths = [
        f"C:\\Program Files\\PostgreSQL\\{ver}\\bin\\{binary_name}.exe" 
        for ver in ["17", "16", "15", "14", "13", "12", "11", "10", "9.6"]
    ]
    possible_paths.extend([
        f"C:\\Program Files\\PostgreSQL\\bin\\{binary_name}.exe",
        f"C:\\PostgreSQL\\bin\\{binary_name}.exe"
    ])
    
    for path in possible_paths:
        if os.path.exists(path):
            logger.info(f"Found {binary_name} at: {path}")
            return path
    
    # If we get here, we couldn't find the binary in standard locations
    # Try to find it in the PATH environment
    try:
        # Check if it's available in PATH
        result = subprocess.run(
            ["where", binary_name],
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE,
            text=True
        )
        if result.returncode == 0 and result.stdout.strip():
            path_result = result.stdout.strip().split("\n")[0]
            logger.info(f"Found {binary_name} in PATH: {path_result}")
            return path_result
    except Exception as e:
        logger.warning(f"Error checking {binary_name} in PATH: {e}")
            
    logger.warning(f"Couldn't find {binary_name} path automatically")
    logger.warning(f"Using '{binary_name}' and relying on system PATH")
    return binary_name

def restore_from_sql_file():
    """Restore database from SQL file"""
    # Use absolute path for SQL_FILE
    sql_file_path = SQL_FILE.resolve()
    
    # Check file exists with absolute path
    if not os.path.exists(sql_file_path):
        logger.info(f"SQL file not found: {sql_file_path}")
        return False
    
    try:
        # Get database connection details from Config
        db_url = Config.SQLALCHEMY_DATABASE_URI
        
        # Parse database URL
        if not db_url.startswith("postgresql://"):
            logger.error("Not a PostgreSQL database URL")
            return False
        
        # Extract connection info
        url_parts = db_url.replace("postgresql://", "").split("@")
        auth = url_parts[0].split(":")
        username = auth[0]
        password = auth[1] if len(auth) > 1 else ""
        
        host_db = url_parts[1].split("/")
        host = host_db[0]
        dbname = host_db[1]
        
        # Find psql path
        psql_cmd = find_pg_bin_path("psql")
        
        # Log all information for debugging
        logger.info(f"SQL file to restore: {sql_file_path}")
        logger.info(f"SQL file exists: {os.path.exists(sql_file_path)}")
        logger.info(f"SQL file size: {os.path.getsize(sql_file_path) if os.path.exists(sql_file_path) else 'N/A'}")
        logger.info(f"Using psql: {psql_cmd}")
        logger.info(f"Host: {host}")
        logger.info(f"Database: {dbname}")
        
        # Set environment variable for password
        env = os.environ.copy()
        env["PGPASSWORD"] = password
        
        # Build psql command to restore dump
        cmd = [
            psql_cmd,
            "-h", host,
            "-U", username,
            "-d", dbname,
            "-f", str(sql_file_path)
        ]
        
        logger.info(f"Restoring database using command: {' '.join(cmd)}")
        result = subprocess.run(
            cmd, 
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        if result.returncode == 0:
            logger.info("✅ Database restored successfully using psql")
            return True
        else:
            logger.error(f"Database restoration failed: {result.stderr}")
            return False
        
    except Exception as e:
        logger.error(f"Error restoring database: {e}")
        logger.error(f"Exception type: {type(e)}")
        # Print stack trace for easier debugging
        import traceback
        logger.error(f"Stack trace: {traceback.format_exc()}")
        return False
    
    except Exception as e:
        logger.error(f"Error restoring database: {e}")
        logger.error(f"Exception type: {type(e)}")
        # Print stack trace for easier debugging
        import traceback
        logger.error(f"Stack trace: {traceback.format_exc()}")
        return False

def init_db():
    """Initialize the database - drop all tables if RESET_DATABASE is True or restore from SQL file if available"""
    # Check for SQL file existence
    sql_file_path = SQL_FILE.resolve()
    logger.info(f"SQL file path (absolute): {sql_file_path}")
    logger.info(f"SQL file exists: {os.path.exists(sql_file_path)}")
    if os.path.exists(sql_file_path):
        logger.info(f"SQL file size: {os.path.getsize(sql_file_path)} bytes")
    
    # Check if tables exist in database
    tables_exist = check_tables_exist()
    logger.info(f"Tables exist in database: {tables_exist}")
    
    # If RESET_DATABASE is True, we always drop tables and then restore from SQL
    if RESET_DATABASE:
        logger.warning("⚠️ RESET_DATABASE is True - Dropping all tables...")
        
        try:
            db.drop_all()
            logger.info("✅ All tables dropped successfully")
            tables_exist = False
            
            # Check for SQL file to restore
            if os.path.exists(sql_file_path):
                logger.info(f"Found SQL file for restore: {sql_file_path}")
                restore_success = restore_from_sql_file()
                
                if restore_success:
                    logger.info("✅ Database restored successfully from SQL file after reset")
                    return
                else:
                    logger.warning("⚠️ Failed to restore from SQL file after reset, creating new database from scratch")
            else:
                logger.warning(f"No SQL file found at {sql_file_path} to restore after reset")
        except Exception as e:
            logger.error(f"Error during database reset: {e}")
            # Continue with normal initialization process
    
    # Standard case: If tables don't exist, try to restore from SQL file
    elif not tables_exist:
        logger.info("Tables don't exist - Checking for SQL file...")
        
        if os.path.exists(sql_file_path):
            logger.info(f"Found SQL file for restore: {sql_file_path}")
            restore_success = restore_from_sql_file()
            
            if restore_success:
                logger.info("✅ Database restored successfully from SQL file")
                return
            else:
                logger.warning("⚠️ Failed to restore from SQL file, creating new database from scratch")
        else:
            logger.warning(f"No SQL file found at {sql_file_path}")
    else:
        logger.info("✅ Tables already exist in database")
        return
    
    # If we get here, we need to create tables and seed data
    logger.info("Creating new database tables...")
    db.create_all()
    logger.info("✅ Database tables created successfully")
    
    # Seed default users
    seed_default_users()
    logger.info("✅ Database & Tables Initialized Successfully!")

# This code runs when db_init.py is run directly
if __name__ == "__main__":
    with app.app_context():
        init_db()