import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

     # 🟢 JWT Configuration
    JWT_SECRET = os.getenv("JWT_SECRET", "default_secret_key")
    JWT_EXPIRE = os.getenv("JWT_EXPIRE", "1d")
