import pandas as pd
import jwt
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database.db_init import db, User, UserFoodLog
from datetime import datetime, timedelta, timezone, date
from database.config import Config
from models.mood_prediction_model import predict_emotion 
from models.food_recommendation_model import get_food_recommendations, get_available_nutrients, personalized_recommendation
from models.food_explaination_ai import FoodExplanationAI
from middleware.auth_utils import get_user_from_token
from middleware.admin_auth import admin_required

# Create the admin_required decorator with needed context
admin_auth = admin_required(Config.JWT_SECRET, User)

auth_api = Blueprint("auth_api", __name__)
emotion_api = Blueprint("emotion_api", __name__)
food_api = Blueprint("food_api", __name__)
explanation_api = Blueprint("explanation_api", __name__)
admin_api = Blueprint("admin_api", __name__)

# 🟢 Hàm tạo JWT token
def create_jwt(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=1),  # Token hết hạn sau 1 ngày
        "iat": datetime.now(timezone.utc)
    }
    token = jwt.encode(payload, Config.JWT_SECRET, algorithm="HS256")
    return token

# Modified get_user_from_token function - using the utility version
def get_user_from_request_token():
    """Get user from JWT token in the request"""
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return None
    
    token = auth_header.split(" ")[1]
    return get_user_from_token(token, Config.JWT_SECRET, User)

@auth_api.route("/register", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    day = data.get("day")
    month = data.get("month")
    year = data.get("year")

    if not name or not email or not password or not day or not month or not year:
        return jsonify({"error": "Missing required fields"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Email already registered"}), 400
    
    try:
        date_of_birth = datetime(int(year), int(month), int(day)).date()
    except ValueError:
        return jsonify({"error": "Invalid date"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(name=name, email=email, password_hash=hashed_password, date_of_birth=date_of_birth, role="user")

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@auth_api.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_jwt(user.id)

    return jsonify({
        "message": "Login successful",
        "token": token,  
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role  
        }
    }), 200

@emotion_api.route("/detect-emotion", methods=["POST"])
def detect_emotion():
    """API nhận ảnh từ frontend và trả về cảm xúc dự đoán."""
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    image_bytes = file.read()  # Đọc ảnh dưới dạng bytes

    # Nhận diện cảm xúc bằng mô hình AI
    emotion = predict_emotion(image_bytes)

    if emotion:
        return jsonify({"emotion": emotion})
    else:
        return jsonify({"error": "Failed to process image."}), 500
    
@food_api.route("/get-nutrients", methods=["GET"])
def get_nutrients():
    """API trả về danh sách các chất dinh dưỡng có thể chọn"""
    nutrients = get_available_nutrients()
    return jsonify({
        "status": "success",
        "nutrients": nutrients
    })

@food_api.route("/get-food-types", methods=["GET"])
def get_food_types():
    """API trả về danh sách các loại thực phẩm có thể chọn"""
    food_types = ['Fruits','Vegetables','Meat','Dairy','Grains','Snacks','Beverages']
    return jsonify({
        "status": "success",
        "food_types": food_types
    })

# Optional enhancement for /recommend-food endpoint in api/routes.py
# You can keep the current version or use this enhanced one

@food_api.route("/recommend-food", methods=["POST"])
def recommend_food():
    """
    API returns context-aware food recommendations with simplified state logic.
    Shows food states (liked/neutral/disliked) and provides rich context information.
    """
    user = get_user_from_request_token()
    
    if not user:
        return jsonify({"error": "Invalid or expired token"}), 401
    
    data = request.json
    
    # Get input data
    emotion = data.get("emotion")
    meal_time = data.get("meal_time")
    food_type = data.get("food_type")
    
    # Check required fields
    if not emotion:
        return jsonify({"error": "Emotion is required"}), 400
    if not meal_time:
        return jsonify({"error": "Meal time is required"}), 400
    
    try:
        # Calculate user age
        today = date.today()
        age = today.year - user.date_of_birth.year - ((today.month, today.day) < (user.date_of_birth.month, user.date_of_birth.day))
        
        # Import helper functions
        from models.food_recommendation_model import (
            log_recommendation_context, 
            predict_user_satisfaction,
            get_user_context_statistics
        )
        
        # Get context statistics before recommendation
        context_stats = get_user_context_statistics(user.id, emotion, meal_time, food_type)
        
        # *** SIMPLIFIED STATE-AWARE PERSONALIZATION ***
        personalized_result = personalized_recommendation(
            user_id=user.id,
            emotion=emotion,
            age=age,
            meal_time=meal_time,
            preferred_food_type=food_type
        )
        
        # Check if personalized recommendation was successful
        if personalized_result.get("status") == "success":
            print(f"Using simplified state-aware recommendations for user {user.id}")
            
            # Get recommendation and alternatives from personalized result
            recommendation = personalized_result.get("recommendation")
            alternatives = personalized_result.get("alternatives", [])
            priority_nutrients = personalized_result.get("priority_nutrients", [])
            adapted = personalized_result.get("adapted", False)
            context_reset = personalized_result.get("context_reset", False)
            preference_summary = personalized_result.get("preference_summary", {})
            
            # Predict user satisfaction
            if recommendation:
                satisfaction_prediction = predict_user_satisfaction(
                    user.id, emotion, meal_time, food_type, recommendation.get('food')
                )
                recommendation['predicted_satisfaction'] = round(satisfaction_prediction, 2)
            
            # Log recommendation context with enhanced info
            log_recommendation_context(
                user.id, emotion, meal_time, food_type, 
                recommendation.get('food') if recommendation else 'None',
                {
                    'adapted': adapted,
                    'context_reset': context_reset,
                    'food_state': recommendation.get('food_state', 'unknown') if recommendation else 'none',
                    'preference_summary': preference_summary,
                    'total_context_ratings': context_stats['total_ratings'],
                    'context_avg_rating': context_stats['avg_rating']
                }
            )
            
        else:
            print(f"Falling back to base recommendations for user {user.id}: {personalized_result.get('error', 'Unknown error')}")
            
            # Fall back to base recommendations if personalized fails
            base_recommendations = get_food_recommendations(
                emotion=emotion,
                birth_date=user.date_of_birth,
                user_id=user.id,
                meal_time=meal_time,
                food_type=food_type
            )
            
            if base_recommendations.get("status") == "error":
                return jsonify(base_recommendations), 400
            
            recommendation = base_recommendations.get("recommendation")
            alternatives = base_recommendations.get("alternatives", [])
            priority_nutrients = base_recommendations.get("priority_nutrients", [])
            adapted = False
            context_reset = False
            preference_summary = {'liked_count': 0, 'neutral_count': 0, 'disliked_count': 0}
            
            # Add default values for base recommendations
            if recommendation:
                recommendation['predicted_satisfaction'] = 0.5  # Neutral for base recommendations
                recommendation['food_state'] = 'base_recommendation'
                recommendation['personalization_reason'] = 'Base recommendation - help us learn your preferences!'
        
        # Ensure we have a valid recommendation
        if not recommendation:
            return jsonify({
                "error": "No suitable recommendations found",
                "status": "error"
            }), 400
        
        # Enhanced response with state information
        response = {
            "status": "success",
            "user_name": user.name,
            "recommendation": recommendation,
            "alternatives": alternatives,
            "priority_nutrients": priority_nutrients,
            "user_id": user.id,
            "emotion": emotion,
            "meal_time": meal_time,
            "food_type": food_type if food_type else "",
            
            # Personalization info
            "personalized": True,
            "adapted": adapted,
            "context_reset": context_reset,
            
            # Enhanced context information
            "context_info": {
                "context_key": f"{emotion}-{meal_time}-{food_type or 'Any'}",
                "total_ratings_in_context": context_stats['total_ratings'],
                "unique_foods_tried": context_stats['unique_foods'],
                "average_rating_in_context": round(context_stats['avg_rating'], 2) if context_stats['avg_rating'] > 0 else 0,
                "rating_distribution": context_stats['rating_distribution'],
                "state_distribution": context_stats.get('state_distribution', {'liked': 0, 'neutral': 0, 'disliked': 0})
            },
            
            # User preference summary for this context
            "preference_summary": {
                "liked_foods_count": preference_summary.get('liked_count', 0),
                "neutral_foods_count": preference_summary.get('neutral_count', 0), 
                "disliked_foods_count": preference_summary.get('disliked_count', 0),
                "total_foods_tried": preference_summary.get('liked_count', 0) + preference_summary.get('neutral_count', 0) + preference_summary.get('disliked_count', 0)
            },
            
            # Explanation for user
            "explanation": {
                "personalization_reason": recommendation.get('personalization_reason', 'Recommendation based on your preferences'),
                "food_state": recommendation.get('food_state', 'unknown'),
                "adaptation_note": recommendation.get('adaptation_note', ''),
                "predicted_satisfaction": recommendation.get('predicted_satisfaction', 0.5)
            }
        }
        
        return jsonify(response)
        
    except Exception as e:
        print(f"Error getting recommendations: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": "Failed to get recommendations"}), 500

@food_api.route("/select-food", methods=["POST"])
def select_food():
    """API updates the food selected by the user if log entry exists"""
    user = get_user_from_request_token()
    
    if not user:
        return jsonify({"error": "Invalid or expired token"}), 401
    
    data = request.json
    log_id = data.get("log_id")
    chosen_food = data.get("chosen_food")
    
    if not log_id or not chosen_food:
        return jsonify({"error": "Log ID and chosen food are required"}), 400
    
    try:
        log_entry = UserFoodLog.query.filter_by(id=log_id, user_id=user.id).first()
        
        if not log_entry:
            return jsonify({"error": "Log entry not found"}), 404
        
        # Update recommended food with the chosen one
        log_entry.recommended_food = chosen_food
        
        db.session.commit()
        
        return jsonify({
            "status": "success",
            "message": "Food selection recorded successfully"
        })
        
    except Exception as e:
        print(f"❌ Error recording food selection: {e}")
        return jsonify({"error": "Failed to record food selection"}), 500

@food_api.route("/rate-food", methods=["POST"])
def rate_food():
    """API creates food log entry with user rating"""
    user = get_user_from_request_token()
    
    if not user:
        return jsonify({"error": "Invalid or expired token"}), 401
    
    data = request.json
    rating = data.get("rating")  # 1-5 rating
    emotion = data.get("emotion")
    meal_time = data.get("meal_time")
    food_type = data.get("food_type", "")
    recommended_food = data.get("recommended_food")
    
    if not rating or not emotion or not meal_time or not recommended_food:
        return jsonify({"error": "Rating, emotion, meal_time, and recommended_food are required"}), 400
    
    try:
        rating = int(rating)
        if rating < 1 or rating > 5:
            return jsonify({"error": "Rating must be between 1 and 5"}), 400
        
        # Create a new log entry with the rating
        log_entry = UserFoodLog(
            user_id=user.id,
            mood=emotion,
            meal_time=meal_time,
            food_type=food_type,
            recommended_food=recommended_food,
            feedback_rating=rating
        )
        
        db.session.add(log_entry)
        db.session.commit()
        
        return jsonify({
            "status": "success",
            "message": "Food recommendation and rating recorded successfully",
            "log_id": log_entry.id
        })
        
    except Exception as e:
        print(f"❌ Error recording food rating: {e}")
        return jsonify({"error": "Failed to record food rating"}), 500

@explanation_api.route("/explain-recommendation", methods=["POST"])
def explain_recommendation():
    """API giải thích chi tiết và đa dạng tại sao món ăn được đề xuất"""
    user = get_user_from_request_token()
    
    if not user:
        return jsonify({"error": "Invalid or expired token"}), 401
    
    data = request.json
    recommendation = data.get("recommendation")
    
    if not recommendation:
        return jsonify({"error": "Recommendation data is required"}), 400
    
    # Thêm thông tin người dùng vào context
    user_data = {
        "emotion": data.get("emotion", "neutral"),
        "age": (datetime.now().date() - user.date_of_birth).days // 365,
        "desired_nutrient": data.get("desired_nutrient")
    }
    
    # Tạo giải thích bằng Explanation AI
    explanation = FoodExplanationAI.explain_recommendation(recommendation, user_data)
    
    return jsonify({
        "status": "success",
        "explanation": explanation
    })

@food_api.route("/get-user-logs", methods=["GET"])
def get_user_logs():
    """API returns food recommendation history for the user"""
    user = get_user_from_request_token()
    
    if not user:
        return jsonify({"error": "Invalid or expired token"}), 401
    
    try:
        # Get all food logs for the user
        logs = UserFoodLog.query.filter_by(user_id=user.id).order_by(UserFoodLog.created_at.desc()).all()
        
        logs_data = []
        for log in logs:
            # Format date and time properly
            formatted_date = log.created_at.strftime('%Y-%m-%d')
            formatted_time = log.created_at.strftime('%H:%M')
            
            logs_data.append({
                "id": log.id,
                "date": formatted_date,
                "time": formatted_time,
                "meal_time": log.meal_time,
                "food_type": log.food_type,
                "recommended_food": log.recommended_food,
                "emotion": log.mood,
                "rating": log.feedback_rating if log.feedback_rating else 0
            })
        
        return jsonify({
            "status": "success",
            "logs": logs_data
        })
        
    except Exception as e:
        print(f"❌ Error fetching food logs: {e}")
        return jsonify({"error": "Failed to fetch food logs"}), 500

# User Management Endpoints
@admin_api.route("/users", methods=["GET"])
@admin_auth
def get_all_users():
    try:
        users = User.query.all()
        users_data = []
        
        for user in users:
            users_data.append({
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
                "date_of_birth": user.date_of_birth.strftime('%Y-%m-%d'),
                "created_at": user.created_at.strftime('%Y-%m-%d %H:%M:%S') if hasattr(user, 'created_at') else None,
                "status": "active"  # You might want to add a status field to your User model
            })
        
        return jsonify({
            "status": "success",
            "users": users_data
        })
    except Exception as e:
        print(f"Error fetching users: {e}")
        return jsonify({"error": "Failed to fetch users"}), 500

@admin_api.route("/users/<int:user_id>", methods=["GET"])
@admin_auth
def get_user_details(user_id):
    try:
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({"error": "User not found"}), 404
            
        # Get user's food logs
        logs = UserFoodLog.query.filter_by(user_id=user_id).all()
        logs_data = []
        
        for log in logs:
            logs_data.append({
                "id": log.id,
                "date": log.created_at.strftime('%Y-%m-%d'),
                "time": log.created_at.strftime('%H:%M'),
                "meal_time": log.meal_time,
                "food_type": log.food_type,
                "recommended_food": log.recommended_food,
                "emotion": log.mood,
                "rating": log.feedback_rating if log.feedback_rating else 0
            })
        
        user_data = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "date_of_birth": user.date_of_birth.strftime('%Y-%m-%d'),
            "created_at": user.created_at.strftime('%Y-%m-%d %H:%M:%S') if hasattr(user, 'created_at') else None,
            "status": "active",  # You might want to add a status field to your User model
            "logs": logs_data
        }
        
        return jsonify({
            "status": "success",
            "user": user_data
        })
    except Exception as e:
        print(f"Error fetching user details: {e}")
        return jsonify({"error": "Failed to fetch user details"}), 500

@admin_api.route("/users/<int:user_id>", methods=["PUT"])
@admin_auth
def update_user(user_id):
    try:
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({"error": "User not found"}), 404
            
        data = request.json
        
        # Update user fields
        if "name" in data:
            user.name = data["name"]
            
        if "email" in data:
            # Check if email already exists
            existing_user = User.query.filter_by(email=data["email"]).first()
            if existing_user and existing_user.id != user_id:
                return jsonify({"error": "Email already in use"}), 400
            user.email = data["email"]
            
        if "role" in data and data["role"] in ["user", "admin"]:
            user.role = data["role"]
            
        if "date_of_birth" in data:
            try:
                user.date_of_birth = datetime.strptime(data["date_of_birth"], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({"error": "Invalid date format"}), 400
        
        # Save changes
        db.session.commit()
        
        return jsonify({
            "status": "success",
            "message": "User updated successfully"
        })
    except Exception as e:
        print(f"Error updating user: {e}")
        return jsonify({"error": "Failed to update user"}), 500

@admin_api.route("/users/<int:user_id>/reset-password", methods=["POST"])
@admin_auth
def reset_user_password(user_id):
    try:
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({"error": "User not found"}), 404
            
        # Generate a random password
        import random
        import string
        new_password = ''.join(random.choices(string.ascii_letters + string.digits, k=10))
        
        # Hash the new password
        hashed_password = generate_password_hash(new_password)
        user.password_hash = hashed_password
        
        db.session.commit()
        
        # In a real application, you would send this password to the user's email
        
        return jsonify({
            "status": "success",
            "message": "Password reset successfully",
            "new_password": new_password  # In production, you wouldn't return this
        })
    except Exception as e:
        print(f"Error resetting password: {e}")
        return jsonify({"error": "Failed to reset password"}), 500

# Analytics Endpoints
@admin_api.route("/dashboard-stats", methods=["GET"])
@admin_auth
def get_dashboard_stats():
    try:
        # Count total users
        total_users = User.query.count()
        
        # Count active users (users who have used the app in the last 30 days)
        thirty_days_ago = datetime.now() - timedelta(days=30)
        active_users = db.session.query(User.id).distinct().join(UserFoodLog).filter(
            UserFoodLog.created_at >= thirty_days_ago
        ).count()
        
        # Count total recommendations
        total_recommendations = UserFoodLog.query.count()
        
        # Get emotion distribution
        emotion_distribution = {}
        emotions = db.session.query(UserFoodLog.mood, db.func.count(UserFoodLog.id)).group_by(
            UserFoodLog.mood
        ).all()
        
        for emotion, count in emotions:
            emotion_distribution[emotion] = count
        
        # Get meal time distribution
        meal_time_distribution = {}
        meal_times = db.session.query(UserFoodLog.meal_time, db.func.count(UserFoodLog.id)).group_by(
            UserFoodLog.meal_time
        ).all()
        
        for meal_time, count in meal_times:
            meal_time_distribution[meal_time] = count
        
        # Get top rated foods with their food_type
        top_rated_foods = db.session.query(
            UserFoodLog.recommended_food,
            UserFoodLog.food_type,
            db.func.avg(UserFoodLog.feedback_rating).label('avg_rating'),
            UserFoodLog.mood,
            db.func.count(UserFoodLog.id).label('count')
        ).filter(
            UserFoodLog.feedback_rating.isnot(None)
        ).group_by(
            UserFoodLog.recommended_food, UserFoodLog.food_type, UserFoodLog.mood
        ).order_by(
            db.desc('avg_rating')
        ).limit(5).all()
        
        top_foods_data = []
        for food, food_type, rating, emotion, count in top_rated_foods:
            top_foods_data.append({
                "food": food,
                "food_type": food_type,
                "rating": float(rating),
                "emotion": emotion,
                "count": count
            })
        
        # Calculate average recommendation rating
        avg_rating_query = db.session.query(
            db.func.avg(UserFoodLog.feedback_rating)
        ).filter(
            UserFoodLog.feedback_rating.isnot(None)
        ).scalar()
        
        average_rating = float(avg_rating_query) if avg_rating_query is not None else 0
        
        return jsonify({
            "status": "success",
            "stats": {
                "totalUsers": total_users,
                "activeUsers": active_users,
                "totalRecommendations": total_recommendations,
                "emotionDistribution": emotion_distribution,
                "mealTimeDistribution": meal_time_distribution,
                "topRatedFoods": top_foods_data,
                "averageRating": average_rating
            }
        })
    except Exception as e:
        print(f"Error fetching dashboard stats: {e}")
        return jsonify({"error": "Failed to fetch dashboard statistics"}), 500

@admin_api.route("/food-trends", methods=["GET"])
@admin_auth
def get_food_trends():
    try:
        # Get emotion filter from query params
        emotion = request.args.get("emotion")
        
        # Base query
        query = db.session.query(
            UserFoodLog.recommended_food,
            UserFoodLog.food_type,
            UserFoodLog.meal_time,
            UserFoodLog.mood,
            db.func.avg(UserFoodLog.feedback_rating).label('avg_rating'),
            db.func.count(UserFoodLog.id).label('count')
        ).filter(
            UserFoodLog.feedback_rating.isnot(None)
        )
        
        # Apply emotion filter if provided
        if emotion:
            query = query.filter(UserFoodLog.mood == emotion)
        
        # Group and order
        results = query.group_by(
            UserFoodLog.recommended_food,
            UserFoodLog.food_type,
            UserFoodLog.meal_time,
            UserFoodLog.mood
        ).order_by(
            db.desc('avg_rating')
        ).all()
        
        trends_data = []
        for food, food_type, meal_time, mood, rating, count in results:
            trends_data.append({
                "food": food,
                "food_type": food_type,
                "meal_time": meal_time,
                "emotion": mood,
                "rating": float(rating),
                "count": count
            })
        
        return jsonify({
            "status": "success",
            "trends": trends_data
        })
    except Exception as e:
        print(f"Error fetching food trends: {e}")
        return jsonify({"error": "Failed to fetch food trends"}), 500

# System Configuration Endpoints
@admin_api.route("/users/<int:user_id>", methods=["DELETE"])
@admin_auth
def delete_user(user_id):
    try:
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({"error": "User not found"}), 404
            
        # Check if trying to delete admin user (you may want to prevent this)
        if user.role == "admin":
            # Option 1: Prevent deleting admin users
            admin_count = User.query.filter_by(role="admin").count()
            if admin_count <= 1:
                return jsonify({"error": "Cannot delete the only admin user"}), 400
        
        # Delete all related food logs first (assuming cascade delete is not set up)
        UserFoodLog.query.filter_by(user_id=user_id).delete()
        
        # Delete the user
        db.session.delete(user)
        db.session.commit()
        
        return jsonify({
            "status": "success",
            "message": "User deleted successfully"
        })
    except Exception as e:
        print(f"Error deleting user: {e}")
        return jsonify({"error": "Failed to delete user"}), 500
