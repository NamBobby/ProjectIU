import joblib
import json
import numpy as np
import pandas as pd
from pathlib import Path
from datetime import date, timedelta
import warnings

# Ẩn warning về feature names
warnings.filterwarnings("ignore", category=UserWarning, 
                       message="X does not have valid feature names, but RandomForest")

# Constants
SUPPORTED_EMOTIONS = ['sad', 'disgust', 'angry', 'neutral', 'surprise', 'happy', 'fear']
SUPPORTED_MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack']
SUPPORTED_FOOD_TYPES = ['Fruits', 'Vegetables', 'Meat', 'Dairy', 'Grains', 'Snacks', 'Beverages']

# Priority nutrients for each emotion - for API to return to frontend
EMOTION_PRIORITY_NUTRIENTS = {
    'happy': ['Protein', 'Carbohydrates', 'Vitamin D', 'Polyunsaturated Fats', 'Magnesium'],
    'sad': [
        'Polyunsaturated Fats', 'Vitamin D', 'Protein', 'Vitamin B6', 'Vitamin B12', 'Magnesium', 'Zinc'
    ], 
    'angry': ['Magnesium', 'Vitamin C'],
    'fear': ['Magnesium', 'Polyunsaturated Fats', 'Vitamin B6', 'Vitamin B12', 'Vitamin C'],
    'neutral': [
        'Carbohydrates', 'Protein', 'Vitamin B1', 'Vitamin B2', 'Vitamin B3',
        'Vitamin B5', 'Vitamin B6', 'Vitamin B12', 'Magnesium', 'Zinc', 'Iron'
    ],
    'surprise': [
        'Carbohydrates', 'Vitamin B1', 'Vitamin B2', 'Vitamin B3', 'Vitamin B5',
        'Vitamin B6', 'Vitamin B12', 'Protein', 'Vitamin C', 'Vitamin D'
    ],
    'disgust': ['Dietary Fiber', 'Magnesium', 'Zinc', 'Vitamin B6']
}

# Predefined nutrition general limits by age group
NUTRITION_GENERAL_LIMITS = {
    'Caloric Value': {'child': 1800, 'adult': 3300},
    'Fat': {'child': 70000, 'adult': 128333.33},
    'Polyunsaturated Fats': {'child': 3000, 'adult': 3000},
    'Carbohydrates': {'child': 292500, 'adult': 536250},
    'Sugars': {'child': 45000, 'adult': 82500},
    'Protein': {'child': 27000, 'adult': 71000},
    'Dietary Fiber': {'child': 13000, 'adult': 30000},
    'Sodium': {'child': 1500, 'adult': 2000},
    'Vitamin A': {'child': 900, 'adult': 3000},
    'Vitamin B1': {'child': 0.7, 'adult': 1.4},
    'Vitamin B11': {'child': 0.4, 'adult': 1},
    'Vitamin B12': {'child': 0.0015, 'adult': 0.003},
    'Vitamin B2': {'child': 0.7, 'adult': 1.7},
    'Vitamin B3': {'child': 12, 'adult': 16},
    'Vitamin B5': {'child': 4, 'adult': 5},
    'Vitamin B6': {'child': 0.9, 'adult': 1.7},
    'Vitamin C': {'child': 50, 'adult': 100},
    'Vitamin D': {'child': 0.05, 'adult': 0.1},
    'Vitamin E': {'child': 100, 'adult': 300},
    'Vitamin K': {'child': 0.06, 'adult': 0.12},
    'Calcium': {'child': 1000, 'adult': 2500},
    'Iron': {'child': 10, 'adult': 18},
    'Copper': {'child': 0.7, 'adult': 0.9},
    'Magnesium': {'child': 200, 'adult': 420},
    'Manganese': {'child': 1.5, 'adult': 2.3},
    'Phosphorus': {'child': 800, 'adult': 1250},
    'Potassium': {'child': 2600, 'adult': 4700},
    'Zinc': {'child': 12, 'adult': 40}
}

# Define models path
models_dir = Path(__file__).parent / "recommendation_models"
data_dir = Path(__file__).parent / "../data"

# Load models, encoders, and data
try:
    # Load trained models
    rank_model = joblib.load(models_dir / "rank_model.pkl")
    reg_model = joblib.load(models_dir / "score_model.pkl")
    binary_model = joblib.load(models_dir / "binary_model.pkl")
    
    # Load encoders
    encoders = joblib.load(models_dir / "encoders.pkl")
    meal_type_encoder = encoders['meal_type_encoder']
    food_type_encoder = encoders['food_type_encoder']
    emotion_encoder = encoders['emotion_encoder']
    
    # Load nutrition info
    with open(models_dir / "nutrition_info.json", 'r') as f:
        nutrition_info = json.load(f)
        nutrition_priorities = nutrition_info.get('nutrition_priorities', {})
        all_nutrients = nutrition_info.get('all_nutrients', [])
        feature_cols = nutrition_info.get('feature_cols', [])
    
    # Use predefined nutrition limits
    nutrition_general_limits = NUTRITION_GENERAL_LIMITS
    
    # Load reduced dataset
    food_data = pd.read_csv(data_dir / "reduced_nutrition_df.csv")
    
    # Initialize scaler for feature scaling
    from sklearn.preprocessing import StandardScaler
    scaler = StandardScaler()
    
    # Fit scaler on numeric columns of food data
    numeric_columns = food_data.select_dtypes(include=['float64', 'int64']).columns
    numeric_data = food_data[numeric_columns].fillna(0)
    scaler.fit(numeric_data)
    
    model_loaded = True
    print("✅ Food recommendation models loaded successfully")
except Exception as e:
    print(f"❌ Error loading food recommendation models: {e}")
    model_loaded = False
    nutrition_priorities = {}
    all_nutrients = []
    feature_cols = []
    nutrition_general_limits = NUTRITION_GENERAL_LIMITS  # Always use predefined limits

def check_nutrient_limits(food_row, age_group, tolerance=1.5):
    """
    Returns True if food is within nutritional limits, False if it violates limits.
    """
    for nutrient, group_limits in nutrition_general_limits.items():
        if nutrient not in food_row:
            continue
        try:
            value = float(food_row[nutrient])
            limit = float(group_limits[age_group])

            if value > limit * tolerance:
                return False  # Violates nutrition limit
        except:
            continue  # Skip if error reading value
    
    return True  # Within limits if no violations found

def calculate_compatibility_score(food_row, emotion, age_group='adult'):
    """
    Calculate compatibility score of food based on emotion with improved scaling
    """
    priority_nutrients = nutrition_priorities.get(emotion, [])
    if not priority_nutrients:
        return 0

    weights = np.linspace(1.0, 0.1, num=len(priority_nutrients))
    total_weight = np.sum(weights)
    score = 0

    for idx, nutrient in enumerate(priority_nutrients):
        if nutrient not in food_row:
            continue

        try:
            val = float(food_row.get(nutrient, 0))
            ideal = nutrition_general_limits.get(nutrient, {}).get(age_group, 1)
            ideal = float(ideal)

            if ideal > 0:
                # Calculate how close the value is to the ideal
                ratio = val / ideal
                if ratio > 2:  # More than double the ideal
                    factor = max(0, 1 - (ratio - 2) / 3)  # Penalty for excessive values
                elif ratio < 0.1:  # Less than 10% of ideal
                    factor = ratio * 2  # Small penalty for very low values
                else:
                    factor = 1 - min(1, abs(val - ideal) / ideal)

                score += (weights[idx] / total_weight) * factor * 10
        except:
            continue

    return round(score, 2)

def create_feature_vector(food_row, emotion, meal_type, age):
    """
    Create a feature vector from food information and context with improved feature handling
    """
    # Dictionary to store features with correct names
    feature_dict = {}
    
    # Fill in basic information with proper names
    for col in feature_cols:
        feature_dict[col] = 0  # Default value
        
        if col == 'age':
            feature_dict[col] = age
        elif col == 'Meal_Type_encoded':
            if meal_type in meal_type_encoder.classes_:
                feature_dict[col] = meal_type_encoder.transform([meal_type])[0]
        elif col == 'emotion_encoded':
            if emotion in emotion_encoder.classes_:
                feature_dict[col] = emotion_encoder.transform([emotion])[0]
        elif col == 'food_type_encoded':
            food_type = food_row['food_type']
            if food_type in food_type_encoder.classes_:
                feature_dict[col] = food_type_encoder.transform([food_type])[0]
        elif col == 'month_encoded':
            # Current month normalized to 0-1
            current_month = date.today().month
            feature_dict[col] = current_month / 12
    
    # Process nutrition data with proper feature names
    for nutrient in all_nutrients:
        if nutrient in food_row:
            try:
                val = float(food_row[nutrient])
                scaled_name = f'{nutrient}_scaled'
                if scaled_name in feature_cols:
                    feature_dict[scaled_name] = val
            except:
                continue
    
    # Create interaction features
    for e in nutrition_priorities.keys():
        priority_nutrients = nutrition_priorities.get(e, [])[:3]  # Top 3 priority nutrients
        for nutrient in priority_nutrients:
            feature_name = f'interaction_{e}_{nutrient}'
            if feature_name in feature_cols:
                if e == emotion:
                    # Get scaled nutrient value
                    scaled_name = f'{nutrient}_scaled'
                    if scaled_name in feature_dict:
                        feature_dict[feature_name] = feature_dict[scaled_name]
                else:
                    feature_dict[feature_name] = 0
    
    # Convert the dict to a feature vector array with exact same ordering as feature_cols
    feature_vector = np.zeros(len(feature_cols))
    for i, col in enumerate(feature_cols):
        feature_vector[i] = feature_dict.get(col, 0)
    
    return feature_vector

def parallel_with_direct_scoring(emotion, meal_type, age, food_type=None, num_recommendations=5):
    """
    Parallel approach but uses direct scoring for final sorting:
    1. Get separate recommendations from each model
    2. Combine and create consensus ranking
    3. Final ordering based on direct scoring
    """
    # Age group determination
    age_group = 'adult' if age > 15 else 'child'
    
    # Filter by food type if specified
    if food_type:
        valid_foods = food_data[food_data['food_type'] == food_type]
        if valid_foods.empty:  # If no foods match the filter, use all foods
            valid_foods = food_data
    else:
        valid_foods = food_data
    
    # Filter by nutrition limits
    valid_foods = valid_foods[valid_foods.apply(
        lambda row: check_nutrient_limits(row, age_group), axis=1
    )]
    
    if valid_foods.empty:
        return None, []
    
    # Process all valid foods through each model
    food_scores = {}
    
    for _, food_row in valid_foods.iterrows():
        food_name = food_row['food']
        food_type_val = food_row['food_type']
        
        if food_type_val not in food_type_encoder.classes_:
            continue
            
        try:
            feature_vector = create_feature_vector(food_row, emotion, meal_type, age)
            
            # Get scores from all models
            rank_prediction = rank_model.predict([feature_vector])[0]
            binary_score = binary_model.predict_proba([feature_vector])[0][1]
            reg_score = reg_model.predict([feature_vector])[0]
            
            # Calculate direct score
            direct_score = calculate_compatibility_score(food_row, emotion, age_group)
            
            food_scores[food_name] = {
                'food': food_name,
                'food_type': food_type_val,
                'rank_score': rank_prediction,  # Lower is better
                'binary_score': binary_score,   # Higher is better
                'reg_score': reg_score,         # Higher is better
                'direct_score': direct_score,   # Higher is better
                'feature_vector': feature_vector,
                'food_row': food_row
            }
        except Exception as e:
            print(f"Error processing food {food_name}: {e}")
            continue
    
    # Exit if no valid foods were processed
    if not food_scores:
        return None, []
    
    # Get top recommendations by each model
    top_by_rank = sorted(food_scores.values(), key=lambda x: x['rank_score'])[:5]
    top_by_binary = sorted(food_scores.values(), key=lambda x: x['binary_score'], reverse=True)[:5]
    top_by_reg = sorted(food_scores.values(), key=lambda x: x['reg_score'], reverse=True)[:5]
    
    # Create a set of unique foods from all models
    unique_foods = {}
    
    # Add foods with their "votes" (appearance count)
    for food in top_by_rank + top_by_binary + top_by_reg:
        name = food['food']
        if name in unique_foods:
            unique_foods[name]['votes'] += 1
        else:
            unique_foods[name] = food.copy()
            unique_foods[name]['votes'] = 1
    
    # Create consensus ranking
    for name, food in unique_foods.items():
        # Calculate average position
        rank_pos = next((i+1 for i, f in enumerate(top_by_rank) if f['food'] == name), 999)
        binary_pos = next((i+1 for i, f in enumerate(top_by_binary) if f['food'] == name), 999)
        reg_pos = next((i+1 for i, f in enumerate(top_by_reg) if f['food'] == name), 999)
        
        # Normalize to 0-1 where 0 is best
        positions = []
        if rank_pos <= 5: positions.append((rank_pos-1)/4)
        if binary_pos <= 5: positions.append((binary_pos-1)/4)
        if reg_pos <= 5: positions.append((reg_pos-1)/4)
        
        food['avg_position'] = sum(positions)/len(positions) if positions else 1.0
        
        # Calculate consensus score
        food['consensus_score'] = food['votes'] - food['avg_position']
    
    # Identify top candidates by consensus
    consensus_candidates = sorted(unique_foods.values(),
                               key=lambda x: (x['votes'], -x['avg_position']),
                               reverse=True)[:10]  # Take top 10 by consensus
    
    # FINAL STEP: Use direct scoring to sort the consensus candidates
    final_sorted = sorted(consensus_candidates, key=lambda x: x['direct_score'], reverse=True)
    
    # Get top recommendation and alternatives
    recommendation = None
    alternatives = []
    
    if final_sorted:
        top_food = final_sorted[0]
        food_row = top_food['food_row']
        
        # Extract nutrition data, including all nutrients with zero values
        nutrition_data = {}
        for nutrient in food_row.index:
            if not pd.isna(food_row[nutrient]):
                try:
                    nutrition_data[nutrient] = float(food_row[nutrient])
                except:
                    nutrition_data[nutrient] = food_row[nutrient]
        
        # Ensure all standard nutrients are present, even if zero
        for nutrient in get_available_nutrients():
            if nutrient not in nutrition_data:
                nutrition_data[nutrient] = 0.0
        
        # Format recommendation
        recommendation = {
            'food': top_food['food'],
            'type': top_food['food_type'],
            'nutrition_data': nutrition_data,
            'image_url': food_row.get('image_url', ''), 
            'model_scores': {
                'rank_score': float(top_food['rank_score']),
                'binary_score': float(top_food['binary_score']),
                'reg_score': float(top_food['reg_score']),
                'direct_score': float(top_food['direct_score']),
                'votes': int(top_food['votes']),
                'consensus_score': float(top_food['consensus_score'])
            }
        }
        
        # Format alternatives (up to 3)
        for alt_food in final_sorted[1:min(4, len(final_sorted))]:
            food_row = alt_food['food_row']
            
            # Extract nutrition data with zero values
            alt_nutrition_data = {}
            for nutrient in food_row.index:
                if not pd.isna(food_row[nutrient]):
                    try:
                        alt_nutrition_data[nutrient] = float(food_row[nutrient])
                    except:
                        alt_nutrition_data[nutrient] = food_row[nutrient]
            
            # Ensure all standard nutrients are present
            for nutrient in get_available_nutrients():
                if nutrient not in alt_nutrition_data:
                    alt_nutrition_data[nutrient] = 0.0
            
            alternatives.append({
                'food': alt_food['food'],
                'type': alt_food['food_type'],
                'nutrition_data': alt_nutrition_data,
                'image_url': food_row.get('image_url', '')
            })
    
    return recommendation, alternatives

def get_food_recommendations(emotion, birth_date, user_id=None, meal_time=None, food_type=None):
    """
    Get food recommendations based on emotion, user info, and preferences using the parallel model approach
    """
    if not model_loaded:
        return {"error": "Recommendation model not loaded"}
    
    # Normalize input
    emotion = emotion.lower() if emotion else "neutral"
    if emotion not in SUPPORTED_EMOTIONS:
        return {
            "error": f"Unsupported emotion: {emotion}. Valid emotions are: {', '.join(SUPPORTED_EMOTIONS)}",
            "status": "error"
        }
    
    if not meal_time or meal_time not in SUPPORTED_MEAL_TYPES:
        return {
            "error": f"Unsupported meal type: {meal_time}. Valid meal types are: {', '.join(SUPPORTED_MEAL_TYPES)}",
            "status": "error"
        }
    
    # Calculate age
    today = date.today()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    
    try:
        # Get recommendations using parallel approach
        recommendation, alternatives = parallel_with_direct_scoring(
            emotion=emotion,
            meal_type=meal_time,
            age=age,
            food_type=food_type
        )
        
        # Check to see if a recommendation is found.
        if not recommendation:
            return {
                "error": f"No suitable food found for {emotion} emotion" + 
                        (f" and {food_type} type" if food_type else ""),
                "status": "error"
            }
        
        # Check emotions directly in EMOTION_PRIORITY_NUTRIENTS
        if emotion not in EMOTION_PRIORITY_NUTRIENTS:
            return {
                "error": f"Priority nutrients not defined for emotion: {emotion}",
                "status": "error"
            }
            
        # Get priority nutrients directly
        priority_nutrients = EMOTION_PRIORITY_NUTRIENTS[emotion]
        
        return {
            'status': 'success',
            'recommendation': recommendation,
            'alternatives': alternatives,
            'priority_nutrients': priority_nutrients
        }
    
    except Exception as e:
        print(f"Error in recommendation process: {e}")
        return {
            "error": f"Failed to generate recommendations: {str(e)}",
            "status": "error"
        }

def get_available_nutrients():
    """Return list of nutrients that can be selected by the user"""
    return [
        'Caloric Value', 'Fat', 'Saturated Fats', 'Monounsaturated Fats', 'Polyunsaturated Fats',
        'Carbohydrates', 'Sugars', 'Protein', 'Dietary Fiber', 'Cholesterol', 'Sodium',
        'Vitamin A', 'Vitamin B1', 'Vitamin B11', 'Vitamin B12', 'Vitamin B2', 'Vitamin B3',
        'Vitamin B5', 'Vitamin B6', 'Vitamin C', 'Vitamin D', 'Vitamin E', 'Vitamin K',
        'Calcium', 'Iron', 'Magnesium', 'Phosphorus', 'Potassium', 'Zinc'
    ]

def get_user_history(user_id):
    """Get user's food selection history from database"""
    from database.db_init import UserFoodLog, db
    
    history_entries = UserFoodLog.query.filter_by(user_id=user_id).all()
    user_history = []
    
    for entry in history_entries:
        if entry.feedback_rating:
            user_history.append({
                'food': entry.recommended_food,
                'rating': entry.feedback_rating,
                'mood': entry.mood,
                'meal_time': entry.meal_time,
                'timestamp': entry.created_at
            })
    
    return user_history

def get_user_context_history(user_id, emotion, meal_time, food_type):
    """Get user's rating history for specific context (emotion + meal_time + food_type)"""
    from database.db_init import UserFoodLog, db
    
    query = UserFoodLog.query.filter_by(
        user_id=user_id,
        mood=emotion.lower(),
        meal_time=meal_time
    )
    
    # Add food_type filter if specified
    if food_type:
        query = query.filter_by(food_type=food_type)
    
    history_entries = query.filter(UserFoodLog.feedback_rating.isnot(None)).all()
    
    context_history = []
    for entry in history_entries:
        context_history.append({
            'food': entry.recommended_food,
            'rating': entry.feedback_rating,
            'food_type': entry.food_type,
            'timestamp': entry.created_at
        })
    
    return context_history

def get_all_available_foods_for_context(emotion, meal_time, age, food_type):
    """Get all foods that could potentially be recommended for this context"""
    try:
        # Get base recommendations to see what foods are available
        base_recs = get_food_recommendations(
            emotion, 
            date.today() - timedelta(days=age*365), 
            meal_time=meal_time, 
            food_type=food_type
        )
        
        if 'error' in base_recs:
            return []
        
        # Get all foods from recommendation and alternatives
        all_foods = []
        
        if base_recs.get('recommendation'):
            all_foods.append(base_recs['recommendation']['food'])
        
        for alt in base_recs.get('alternatives', []):
            if alt.get('food'):
                all_foods.append(alt['food'])
        
        # Also get from food_data directly if we have access
        try:
            age_group = 'adult' if age > 15 else 'child'
            
            # Filter by food type if specified
            if food_type:
                filtered_foods = food_data[food_data['food_type'] == food_type]
            else:
                filtered_foods = food_data
            
            # Filter by nutrition limits
            valid_foods = filtered_foods[filtered_foods.apply(
                lambda row: check_nutrient_limits(row, age_group), axis=1
            )]
            
            for _, food_row in valid_foods.iterrows():
                food_name = food_row['food']
                if food_name not in all_foods:
                    all_foods.append(food_name)
        except Exception as e:
            print(f"⚠️ Could not access food_data directly: {e}")
            # Continue with just the foods from base recommendations
        
        return list(set(all_foods))  # Remove duplicates
        
    except Exception as e:
        print(f"Error getting available foods: {e}")
        return []

def analyze_food_state_transition(ratings):
    """
    Analyze rating history to determine current food state
    
    Logic:
    - All foods start as NEUTRAL
    - From NEUTRAL: High rating (>=4) → LIKED, Low rating (<=2) → DISLIKED
    - From LIKED: Low rating (1st time) → NEUTRAL, Low rating (2nd consecutive time) → DISLIKED
    - From DISLIKED: High rating → NEUTRAL (give second chance)
    """
    
    if len(ratings) == 0:
        return 'neutral'  # Default state
    
    if len(ratings) == 1:
        # First rating ever for this food
        rating = ratings[0]['rating']
        if rating >= 4:
            return 'liked'
        elif rating <= 2:
            return 'disliked'
        else:
            return 'neutral'
    
    # Multiple ratings - analyze state transitions
    # Start from oldest to newest to track state changes
    ratings_chronological = list(reversed(ratings))  # Oldest first
    
    current_state = 'neutral'  # All foods start neutral
    consecutive_low_from_liked = 0  # Track consecutive low ratings from liked state
    
    for i, rating_entry in enumerate(ratings_chronological):
        rating = rating_entry['rating']
        
        if current_state == 'neutral':
            if rating >= 4:
                current_state = 'liked'
                consecutive_low_from_liked = 0  # Reset counter
                print(f"  State transition: NEUTRAL → LIKED (rating: {rating})")
            elif rating <= 2:
                current_state = 'disliked'
                print(f"  State transition: NEUTRAL → DISLIKED (rating: {rating})")
            # Rating = 3 stays neutral
        
        elif current_state == 'liked':
            if rating <= 2:
                consecutive_low_from_liked += 1
                if consecutive_low_from_liked == 1:
                    # First low rating from liked state → back to neutral
                    current_state = 'neutral'
                    print(f"  State transition: LIKED → NEUTRAL (1st low rating: {rating})")
                elif consecutive_low_from_liked >= 2:
                    # Second consecutive low rating from liked → disliked
                    current_state = 'disliked'
                    print(f"  State transition: LIKED → DISLIKED (2nd low rating: {rating})")
            elif rating >= 4:
                # High rating maintains liked state
                consecutive_low_from_liked = 0  # Reset counter
                print(f"  State maintained: LIKED (rating: {rating})")
            else:
                # Rating = 3 from liked goes to neutral
                current_state = 'neutral'
                consecutive_low_from_liked = 0  # Reset counter
                print(f"  State transition: LIKED → NEUTRAL (rating: {rating})")
        
        elif current_state == 'disliked':
            if rating >= 4:
                # High rating from disliked gives second chance (neutral)
                current_state = 'neutral'
                consecutive_low_from_liked = 0  # Reset counter
                print(f"  State transition: DISLIKED → NEUTRAL (2nd chance, rating: {rating})")
            elif rating == 3:
                # Neutral rating from disliked also gives second chance
                current_state = 'neutral'
                consecutive_low_from_liked = 0  # Reset counter
                print(f"  State transition: DISLIKED → NEUTRAL (2nd chance, rating: {rating})")
            # Low rating maintains disliked state
    
    return current_state

def analyze_food_preferences_by_context(user_id, emotion, meal_time, food_type):
    """
    Simplified food preference analysis:
    - All foods start as NEUTRAL
    - NEUTRAL + High rating (>=4) = LIKED
    - NEUTRAL + Low rating (<=2) = DISLIKED  
    - LIKED + Low rating (1st time) = NEUTRAL
    - LIKED + Low rating (2nd time) = DISLIKED
    """
    context_history = get_user_context_history(user_id, emotion, meal_time, food_type)
    
    if not context_history:
        print(f"No context history for {emotion}-{meal_time}-{food_type or 'Any'}")
        return {}, {}, {}
    
    # Group ratings by food and sort by timestamp (most recent first)
    food_ratings = {}
    for entry in context_history:
        food = entry['food']
        rating = entry['rating']
        timestamp = entry['timestamp']
        
        if food not in food_ratings:
            food_ratings[food] = []
        
        food_ratings[food].append({
            'rating': rating,
            'timestamp': timestamp
        })
    
    # Sort ratings by timestamp for each food (most recent first)
    for food in food_ratings:
        food_ratings[food].sort(key=lambda x: x['timestamp'], reverse=True)
    
    # Categorize foods based on simplified logic
    liked_foods = {}      # food -> latest_rating
    neutral_foods = {}    # food -> latest_rating  
    disliked_foods = {}   # food -> latest_rating
    
    for food, ratings in food_ratings.items():
        # Analyze rating history to determine current state
        current_state = analyze_food_state_transition(ratings)
        
        latest_rating = ratings[0]['rating']  # Most recent rating
        
        if current_state == 'liked':
            liked_foods[food] = latest_rating
            print(f"👍 {food}: LIKED (latest rating: {latest_rating})")
        elif current_state == 'disliked':
            disliked_foods[food] = latest_rating
            print(f"👎 {food}: DISLIKED (latest rating: {latest_rating})")
        else:  # neutral
            neutral_foods[food] = latest_rating
            print(f"😐 {food}: NEUTRAL (latest rating: {latest_rating})")
    
    print(f"Context analysis for {emotion}-{meal_time}-{food_type or 'Any'}:")
    print(f"   👍 Liked: {list(liked_foods.keys())}")
    print(f"   😐 Neutral: {list(neutral_foods.keys())}")
    print(f"   👎 Disliked: {list(disliked_foods.keys())}")
    
    return liked_foods, neutral_foods, disliked_foods

def reset_disliked_foods_to_neutral(user_id, emotion, meal_time, food_type):
    """
    Reset all disliked foods to neutral for this specific context
    by adding new neutral ratings (rating = 3) instead of modifying existing ones
    """
    from database.db_init import UserFoodLog, db
    
    try:
        # Get current preferences
        liked_foods, neutral_foods, disliked_foods = analyze_food_preferences_by_context(
            user_id, emotion, meal_time, food_type
        )
        
        if not disliked_foods:
            print("No disliked foods to reset")
            return 0
        
        # Add neutral ratings (3) for all currently disliked foods
        reset_count = 0
        for food_name in disliked_foods.keys():
            # Create a new log entry with neutral rating
            new_log = UserFoodLog(
                user_id=user_id,
                mood=emotion.lower(),
                meal_time=meal_time,
                food_type=food_type or '',
                recommended_food=food_name,
                feedback_rating=3  # Neutral rating
            )
            
            db.session.add(new_log)
            reset_count += 1
            print(f"Added neutral rating for: {food_name}")
        
        db.session.commit()
        
        print(f"Reset {reset_count} disliked foods to neutral for context {emotion}-{meal_time}-{food_type or 'Any'}")
        
        return reset_count
        
    except Exception as e:
        print(f"Error resetting disliked foods: {e}")
        db.session.rollback()
        return 0

def get_user_context_statistics(user_id, emotion, meal_time, food_type=None):
    """Get statistics about user's rating history for a specific context with state analysis"""
    from database.db_init import UserFoodLog, db
    
    query = UserFoodLog.query.filter_by(
        user_id=user_id,
        mood=emotion.lower(),
        meal_time=meal_time
    )
    
    if food_type:
        query = query.filter_by(food_type=food_type)
    
    entries = query.filter(UserFoodLog.feedback_rating.isnot(None)).all()
    
    if not entries:
        return {
            'total_ratings': 0,
            'unique_foods': 0,
            'avg_rating': 0,
            'rating_distribution': {},
            'state_distribution': {'liked': 0, 'neutral': 0, 'disliked': 0}
        }
    
    # Calculate basic statistics
    ratings = [entry.feedback_rating for entry in entries]
    unique_foods = set([entry.recommended_food for entry in entries])
    
    rating_distribution = {}
    for rating in range(1, 6):
        rating_distribution[rating] = ratings.count(rating)
    
    # Calculate current state distribution
    liked_foods, neutral_foods, disliked_foods = analyze_food_preferences_by_context(
        user_id, emotion, meal_time, food_type
    )
    
    state_distribution = {
        'liked': len(liked_foods),
        'neutral': len(neutral_foods),
        'disliked': len(disliked_foods)
    }
    
    return {
        'total_ratings': len(ratings),
        'unique_foods': len(unique_foods),
        'avg_rating': sum(ratings) / len(ratings),
        'rating_distribution': rating_distribution,
        'state_distribution': state_distribution,
        'latest_ratings': ratings[-5:] if len(ratings) >= 5 else ratings
    }

def log_recommendation_context(user_id, emotion, meal_time, food_type, recommended_food, context_info=None):
    """Log additional context information when making recommendations"""
    try:
        # This could be used to log recommendation context for analytics
        # For now, we'll just print debug info
        stats = get_user_context_statistics(user_id, emotion, meal_time, food_type)
        
        print(f"📊 Context Statistics for user {user_id}:")
        print(f"   Context: {emotion}-{meal_time}-{food_type or 'Any'}")
        print(f"   Total ratings: {stats['total_ratings']}")
        print(f"   Unique foods tried: {stats['unique_foods']}")
        print(f"   Average rating: {stats['avg_rating']:.2f}")
        print(f"   Rating distribution: {stats['rating_distribution']}")
        print(f"   State distribution: {stats['state_distribution']}")
        print(f"   Recommended: {recommended_food}")
        
        if context_info:
            print(f"   Context info: {context_info}")
            
    except Exception as e:
        print(f"Error logging recommendation context: {e}")

def predict_user_satisfaction(user_id, emotion, meal_time, food_type, recommended_food):
    """Predict how likely the user is to like the recommended food based on context history"""
    try:
        # Get user's history for this context
        context_history = get_user_context_history(user_id, emotion, meal_time, food_type)
        
        if not context_history:
            return 0.5  # Neutral probability for new context
        
        # Check if this exact food was recommended before in this context
        food_history = [entry for entry in context_history if entry['food'] == recommended_food]
        
        if food_history:
            # Calculate average rating for this food in this context
            avg_rating = sum([entry['rating'] for entry in food_history]) / len(food_history)
            # Convert to probability (0-1)
            return (avg_rating - 1) / 4  # Scale from 1-5 to 0-1
        
        # If food hasn't been tried in this context, use general context satisfaction
        all_ratings = [entry['rating'] for entry in context_history]
        avg_context_rating = sum(all_ratings) / len(all_ratings)
        
        return (avg_context_rating - 1) / 4  # Scale from 1-5 to 0-1
        
    except Exception as e:
        print(f"Error predicting user satisfaction: {e}")
        return 0.5  # Default neutral probability

def personalized_recommendation(user_id, emotion, age, meal_time, preferred_food_type=None):
    """
    Personalized recommendation system with simplified state logic:
    - All foods start NEUTRAL
    - NEUTRAL + High rating (≥4) = LIKED
    - NEUTRAL + Low rating (≤2) = DISLIKED
    - LIKED + Low rating (1st time) = NEUTRAL
    - LIKED + Low rating (2nd time) = DISLIKED
    """
    # Input validation
    if emotion.lower() not in SUPPORTED_EMOTIONS:
        return {
            "error": f"Unsupported emotion: {emotion}. Valid emotions are: {', '.join(SUPPORTED_EMOTIONS)}",
            "status": "error"
        }
    
    if meal_time not in SUPPORTED_MEAL_TYPES:
        return {
            "error": f"Unsupported meal type: {meal_time}. Valid meal types are: {', '.join(SUPPORTED_MEAL_TYPES)}",
            "status": "error"
        }
    
    if preferred_food_type and preferred_food_type not in SUPPORTED_FOOD_TYPES:
        return {
            "error": f"Unsupported food type: {preferred_food_type}. Valid food types are: {', '.join(SUPPORTED_FOOD_TYPES)}",
            "status": "error"
        }
    
    try:
        print(f"Getting personalized recommendations for user {user_id}")
        print(f"   Context: {emotion} + {meal_time} + {preferred_food_type or 'Any'}")
        
        # Get context-specific user preferences with simplified logic
        liked_foods, neutral_foods, disliked_foods = analyze_food_preferences_by_context(
            user_id, emotion, meal_time, preferred_food_type
        )
        
        # Get base recommendations for this context
        base_recs = get_food_recommendations(
            emotion, 
            date.today() - timedelta(days=age*365), 
            meal_time=meal_time, 
            food_type=preferred_food_type
        )
        
        if 'error' in base_recs:
            return base_recs
        
        # Extract available recommendations
        recommendation = base_recs.get('recommendation')
        alternatives = base_recs.get('alternatives', [])
        all_recommendations = []
        
        if recommendation:
            all_recommendations.append(recommendation)
        all_recommendations.extend(alternatives)
        
        if not all_recommendations:
            return {
                "error": "No recommendations available",
                "status": "error"
            }
        
        # *** SIMPLIFIED PERSONALIZATION LOGIC ***
        personalized_recommendations = []
        
        # Priority 1: LIKED foods from this context
        for rec in all_recommendations:
            if rec and rec.get('food') in liked_foods:
                rec_copy = rec.copy()
                rec_copy['personalization_reason'] = f"You love this! (Rating: {liked_foods[rec['food']]}/5)"
                rec_copy['food_state'] = 'liked'
                rec_copy['context_rating'] = liked_foods[rec['food']]
                personalized_recommendations.append(rec_copy)
                print(f"Found LIKED food: {rec.get('food')} (rating: {liked_foods[rec['food']]})")
        
        # Priority 2: NEUTRAL foods (both rated neutral and never tried)
        for rec in all_recommendations:
            if rec and rec.get('food') not in disliked_foods and rec not in personalized_recommendations:
                rec_copy = rec.copy()
                
                if rec.get('food') in neutral_foods:
                    rec_copy['personalization_reason'] = f"Previously neutral (Rating: {neutral_foods[rec['food']]}/5) - worth another try!"
                    rec_copy['food_state'] = 'neutral_tried'
                    rec_copy['context_rating'] = neutral_foods[rec['food']]
                else:
                    rec_copy['personalization_reason'] = f"Fresh {preferred_food_type or 'food'} recommendation for your {emotion} mood!"
                    rec_copy['food_state'] = 'neutral_new'
                    rec_copy['context_rating'] = None
                
                personalized_recommendations.append(rec_copy)
        
        # *** CHECK IF ALL AVAILABLE OPTIONS ARE DISLIKED ***
        if not personalized_recommendations and disliked_foods:
            print(f"⚠️ All available options are DISLIKED for this context!")
            
            # Get all possible foods for this context
            all_available_foods = get_all_available_foods_for_context(
                emotion, meal_time, age, preferred_food_type
            )
            
            print(f"Total available foods for context: {len(all_available_foods)}")
            print(f"Currently disliked foods: {len(disliked_foods)}")
            
            # Check if we've disliked most available options (threshold: 80%)
            disliked_ratio = len(disliked_foods) / max(len(all_available_foods), 1)
            
            if disliked_ratio >= 0.8:  # If 80% or more are disliked
                print(f"AUTO-RESET: Disliked ratio is {disliked_ratio:.2f} (≥80%)")
                print(f"Resetting {len(disliked_foods)} disliked foods to NEUTRAL...")
                
                # Reset all disliked foods to neutral by adding neutral ratings
                reset_count = reset_disliked_foods_to_neutral(
                    user_id, emotion, meal_time, preferred_food_type
                )
                
                if reset_count > 0:
                    # Re-analyze preferences after reset
                    print("🔄 Re-analyzing preferences after reset...")
                    liked_foods, neutral_foods, disliked_foods = analyze_food_preferences_by_context(
                        user_id, emotion, meal_time, preferred_food_type
                    )
                    
                    # Now all previously disliked foods should be neutral
                    for rec in all_recommendations:
                        if rec:
                            rec_copy = rec.copy()
                            rec_copy['personalization_reason'] = "Fresh start! We reset your preferences for this context."
                            rec_copy['adaptation_note'] = f"We reset {reset_count} foods to neutral to give you fresh options."
                            rec_copy['food_state'] = 'reset_to_neutral'
                            rec_copy['context_reset'] = True
                            personalized_recommendations.append(rec_copy)
                            print(f"Added reset food: {rec.get('food')}")
                
            else:
                # Not enough foods are disliked yet, try alternative strategies
                print(f"Trying alternative strategies (disliked ratio: {disliked_ratio:.2f} < 80%)")
                
                # Strategy 1: Expand food type
                if preferred_food_type:
                    print("Strategy 1: Expanding beyond preferred food type...")
                    alt_recs = get_food_recommendations(
                        emotion, 
                        date.today() - timedelta(days=age*365), 
                        meal_time=meal_time, 
                        food_type=None  # Remove food type restriction
                    )
                    
                    if 'recommendation' in alt_recs and alt_recs['status'] == 'success':
                        new_rec = alt_recs.get('recommendation')
                        if new_rec and new_rec.get('food') not in disliked_foods:
                            new_rec_copy = new_rec.copy()
                            new_rec_copy['personalization_reason'] = f"Trying beyond {preferred_food_type} foods for variety!"
                            new_rec_copy['adaptation_note'] = f"Expanded beyond {preferred_food_type} since you've tried most options."
                            new_rec_copy['food_state'] = 'expanded_type'
                            personalized_recommendations.append(new_rec_copy)
                            print(f"Found expanded food type: {new_rec.get('food')} ({new_rec.get('type')})")
                
                # Strategy 2: Try different meal times
                if not personalized_recommendations:
                    print("Strategy 2: Trying different meal times...")
                    alternative_meal_types = [mt for mt in SUPPORTED_MEAL_TYPES if mt != meal_time]
                    
                    for alt_meal_type in alternative_meal_types:
                        alt_recs = get_food_recommendations(
                            emotion, 
                            date.today() - timedelta(days=age*365), 
                            meal_time=alt_meal_type, 
                            food_type=preferred_food_type
                        )
                        
                        if 'recommendation' in alt_recs and alt_recs['status'] == 'success':
                            new_rec = alt_recs.get('recommendation')
                            if new_rec and new_rec.get('food') not in disliked_foods:
                                new_rec_copy = new_rec.copy()
                                new_rec_copy['personalization_reason'] = f"This {alt_meal_type} food matches your {emotion} mood!"
                                new_rec_copy['adaptation_note'] = f"Trying {alt_meal_type} options for variety."
                                new_rec_copy['food_state'] = 'different_meal_time'
                                personalized_recommendations.append(new_rec_copy)
                                print(f"Found different meal time: {new_rec.get('food')} ({alt_meal_type})")
                                break
        
        # Final fallback: Use least disliked foods if nothing else works
        if not personalized_recommendations and disliked_foods:
            print("Final fallback: Using least disliked foods...")
            
            # Sort disliked foods by rating (highest rating among disliked)
            sorted_disliked = sorted(disliked_foods.items(), key=lambda x: x[1], reverse=True)
            
            for food, rating in sorted_disliked[:2]:
                for rec in all_recommendations:
                    if rec and rec.get('food') == food:
                        rec_copy = rec.copy()
                        rec_copy['personalization_reason'] = f"Your best option among tried foods (Rating: {rating}/5)"
                        rec_copy['adaptation_note'] = "This was your highest-rated option. Rate again to help us learn!"
                        rec_copy['food_state'] = 'least_disliked'
                        rec_copy['context_rating'] = rating
                        personalized_recommendations.append(rec_copy)
                        print(f"Added least disliked: {food} (rating: {rating})")
                        break
        
        # Absolute last resort
        if not personalized_recommendations and recommendation:
            rec_copy = recommendation.copy()
            rec_copy['personalization_reason'] = "New recommendation - help us learn your preferences!"
            rec_copy['adaptation_note'] = "Building your preference profile for this context."
            rec_copy['food_state'] = 'fallback'
            personalized_recommendations.append(rec_copy)
            print(f"Added fallback: {recommendation.get('food')}")
        
        # Ensure we have recommendations
        if not personalized_recommendations:
            return {
                "error": "Unable to find suitable recommendations",
                "status": "error"
            }
        
        # Get priority nutrients
        priority_nutrients = EMOTION_PRIORITY_NUTRIENTS.get(emotion.lower(), [])
        
        # Check if any adaptations were made
        adapted = any('adaptation_note' in rec for rec in personalized_recommendations)
        context_reset = any('context_reset' in rec for rec in personalized_recommendations)
        
        print(f"  Returning {len(personalized_recommendations)} personalized recommendations")
        print(f"   Adapted: {adapted}, Context Reset: {context_reset}")
        
        return {
            'status': 'success',
            'recommendation': personalized_recommendations[0],
            'alternatives': personalized_recommendations[1:4] if len(personalized_recommendations) > 1 else [],
            'priority_nutrients': priority_nutrients,
            'adapted': adapted,
            'context_reset': context_reset,
            'personalization_applied': True,
            'context': f"{emotion}-{meal_time}-{preferred_food_type or 'Any'}",
            'preference_summary': {
                'liked_count': len(liked_foods),
                'neutral_count': len(neutral_foods), 
                'disliked_count': len(disliked_foods)
            }
        }
        
    except Exception as e:
        print(f" Error in simplified personalized recommendation: {e}")
        import traceback
        traceback.print_exc()
        return {
            "error": f"Failed to generate personalized recommendations: {str(e)}",
            "status": "error"
        }