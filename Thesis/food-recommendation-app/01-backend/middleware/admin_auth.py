from flask import request, jsonify
from functools import wraps
from middleware.auth_utils import get_user_from_token

def admin_required(jwt_secret, user_model):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Get authorization header
            auth_header = request.headers.get("Authorization")
            if not auth_header or not auth_header.startswith("Bearer "):
                return jsonify({"error": "Authentication required"}), 401
            
            token = auth_header.split(" ")[1]
            user = get_user_from_token(token, jwt_secret, user_model)
            
            # Check if user exists and has admin role
            if not user or user.role != "admin":
                return jsonify({"error": "Admin privileges required"}), 403
                
            return f(*args, **kwargs)
        return decorated_function
    return decorator