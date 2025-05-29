#!/usr/bin/env python
import os
import subprocess
import argparse
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Constants
DATA_DIR = Path(__file__).parent.parent / "data"
SQL_FILE = DATA_DIR / "database.sql"

# Create data directory if needed
DATA_DIR.mkdir(exist_ok=True)

def parse_db_url(db_url):
    """Parse PostgreSQL database URL to extract connection details"""
    # Expected format: postgresql://username:password@localhost/dbname
    if not db_url or not db_url.startswith("postgresql://"):
        raise ValueError("Invalid PostgreSQL connection string")
    
    # Remove postgresql:// prefix
    connection_string = db_url.replace("postgresql://", "")
    
    # Split user:password@host:port/dbname
    auth_host_db = connection_string.split("@")
    if len(auth_host_db) != 2:
        raise ValueError("Invalid PostgreSQL connection string format")
    
    # Extract username and password
    auth = auth_host_db[0].split(":")
    username = auth[0]
    password = auth[1] if len(auth) > 1 else ""
    
    # Extract host and database name
    host_db = auth_host_db[1].split("/")
    if len(host_db) != 2:
        raise ValueError("Invalid PostgreSQL connection string format")
    
    host = host_db[0]
    port = "5432"  # Default PostgreSQL port
    
    # Handle port if specified
    if ":" in host:
        host_parts = host.split(":")
        host = host_parts[0]
        port = host_parts[1]
    
    dbname = host_db[1]
    
    return {
        "dbname": dbname,
        "user": username,
        "password": password,
        "host": host,
        "port": port
    }

def find_pg_bin_path(binary_name):
    """Find path to PostgreSQL binary on Windows"""
    if os.name != 'nt':  # Not Windows
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
            print(f"✅ Found {binary_name} at: {path}")
            return path
            
    print(f"⚠️ Couldn't find {binary_name} path automatically")
    print(f"  Using '{binary_name}' and relying on system PATH")
    return binary_name

def export_database():
    """Export the database to a SQL file"""
    # Get database URL from environment
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("❌ Error: DATABASE_URL not found in environment variables")
        return False
    
    try:
        # Parse database connection details
        db_info = parse_db_url(db_url)
        
        # Set environment variable for password
        env = os.environ.copy()
        env["PGPASSWORD"] = db_info["password"]
        
        # Find path to pg_dump
        pg_dump_cmd = find_pg_bin_path("pg_dump")
        
        # Create pg_dump command
        cmd = [
            pg_dump_cmd,
            "-h", db_info["host"],
            "-p", db_info["port"],
            "-U", db_info["user"],
            "-d", db_info["dbname"],
            "--no-owner",
            "--no-acl",
            "-f", str(SQL_FILE)
        ]
        
        # Execute pg_dump command
        print(f"📤 Exporting database to {SQL_FILE}...")
        result = subprocess.run(
            cmd,
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        if result.returncode != 0:
            print(f"❌ Error exporting database: {result.stderr}")
            return False
        
        print(f"✅ Database exported successfully to {SQL_FILE}")
        return True
    
    except Exception as e:
        print(f"❌ Error exporting database: {e}")
        return False

def import_database():
    """Import the database from a SQL file"""
    # Get database URL from environment
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("❌ Error: DATABASE_URL not found in environment variables")
        return False
    
    if not SQL_FILE.exists():
        print(f"❌ Error: SQL file not found: {SQL_FILE}")
        return False
    
    try:
        # Parse database connection details
        db_info = parse_db_url(db_url)
        
        # Set environment variable for password
        env = os.environ.copy()
        env["PGPASSWORD"] = db_info["password"]
        
        # Find path to psql
        psql_cmd = find_pg_bin_path("psql")
        
        # Create psql command
        cmd = [
            psql_cmd,
            "-h", db_info["host"],
            "-p", db_info["port"],
            "-U", db_info["user"],
            "-d", db_info["dbname"],
            "-f", str(SQL_FILE)
        ]
        
        # Execute psql command
        print(f"📥 Importing database from {SQL_FILE}...")
        result = subprocess.run(
            cmd,
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        if result.returncode != 0:
            print(f"❌ Error importing database: {result.stderr}")
            return False
        
        print(f"✅ Database imported successfully from {SQL_FILE}")
        return True
    
    except Exception as e:
        print(f"❌ Error importing database: {e}")
        return False

def check_db_exists():
    """Check if database exists and create it if needed"""
    # Get database URL from environment
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("❌ Error: DATABASE_URL not found in environment variables")
        return False
    
    try:
        # Parse database connection details
        db_info = parse_db_url(db_url)
        
        # Set environment variable for password
        env = os.environ.copy()
        env["PGPASSWORD"] = db_info["password"]
        
        # Find paths to PostgreSQL binaries
        psql_cmd = find_pg_bin_path("psql")
        createdb_cmd = find_pg_bin_path("createdb")
        
        # Check if database exists
        cmd = [
            psql_cmd,
            "-h", db_info["host"],
            "-p", db_info["port"],
            "-U", db_info["user"],
            "-lqt"
        ]
        
        result = subprocess.run(
            cmd,
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        if result.returncode != 0:
            print(f"❌ Error checking database: {result.stderr}")
            return False
        
        # Check if database exists in output
        db_exists = False
        for line in result.stdout.splitlines():
            if db_info["dbname"] in line:
                db_exists = True
                break
        
        if not db_exists:
            print(f"⚠️ Database '{db_info['dbname']}' does not exist. Creating...")
            
            # Create database
            cmd = [
                createdb_cmd,
                "-h", db_info["host"],
                "-p", db_info["port"],
                "-U", db_info["user"],
                db_info["dbname"]
            ]
            
            result = subprocess.run(
                cmd,
                env=env,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            
            if result.returncode != 0:
                print(f"❌ Error creating database: {result.stderr}")
                return False
            
            print(f"✅ Database '{db_info['dbname']}' created successfully")
        else:
            print(f"✅ Database '{db_info['dbname']}' already exists")
        
        return True
    
    except Exception as e:
        print(f"❌ Error checking database: {e}")
        return False

# This is the direct entry point when running this file as a script
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='PostgreSQL Database Export/Import Utility')
    parser.add_argument('action', choices=['export', 'import', 'check'], 
                        help='Action to perform: export, import, or check database')
    
    args = parser.parse_args()
    
    if args.action == 'export':
        export_database()
    elif args.action == 'import':
        import_database()
    elif args.action == 'check':
        check_db_exists()