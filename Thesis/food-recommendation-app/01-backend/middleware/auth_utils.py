import jwt
from flask import request, jsonify
from datetime import datetime, timezone

def get_user_from_token(token, jwt_secret, user_model):
    """Get user from JWT token"""
    try:
        payload = jwt.decode(token, jwt_secret, algorithms=["HS256"])
        user_id = payload.get("user_id")
        if not user_id:
            return None
        
        user = user_model.query.get(user_id)
        return user
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None