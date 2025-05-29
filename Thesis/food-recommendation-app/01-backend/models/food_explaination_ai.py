from pathlib import Path
import random
import json

class FoodExplanationAI:
    # Comprehensive mood-nutrient mapping based on Appendix A
    MOOD_NUTRIENTS_MAP = {
        "sad": {
            "Polyunsaturated Fats": "Reduces inflammation and improves depressive symptoms, especially EPA is shown effective in RCTs.",
            "Vitamin D": "Enhances serotonin synthesis through gene activation (TPH2), supports emotional recovery.",
            "Protein": "Precursor to serotonin; when consumed with carbohydrates, increases serotonin availability in brain.",
            "Vitamin B6": "Cofactors in synthesis of serotonin and dopamine; supplementation reduces depressive symptoms.",
            "Vitamin B12": "Cofactors in synthesis of serotonin and dopamine; supplementation reduces depressive symptoms.",
            "Magnesium": "Calms the nervous system, regulates GABA, and improves mood and sleep in depression.",
            "Zinc": "Modulates NMDA receptors, reduces neuroinflammation, supports mood regulation and cognition."
        },
        "fear": {
            "Magnesium": "Reduces stress and anxiety by regulating HPA axis and enhancing GABAergic activity.",
            "Polyunsaturated Fats": "Decreases inflammation and cortisol; improves emotional resilience under chronic stress.",
            "Vitamin B6": "Antioxidant; reduces oxidative stress and modulates cortisol and neurotransmitter synthesis.",
            "Vitamin B12": "Antioxidant; reduces oxidative stress and modulates cortisol and neurotransmitter synthesis.",
            "Vitamin C": "Improved symptoms in those with stress-related deficiencies."
        },
        "neutral": {
            "Carbohydrates": "Provides steady glucose to support brain energy and stable mood.",
            "Protein": "Supplies amino acids needed for neurotransmitter synthesis.",
            "Vitamin B1": "Supports energy metabolism, brain cell function, and cognitive performance.",
            "Vitamin B2": "Supports energy metabolism, brain cell function, and cognitive performance.",
            "Vitamin B3": "Supports energy metabolism, brain cell function, and cognitive performance.",
            "Vitamin B5": "Supports energy metabolism, brain cell function, and cognitive performance.",
            "Vitamin B6": "Supports energy metabolism, brain cell function, and cognitive performance.",
            "Vitamin B12": "Supports energy metabolism, brain cell function, and cognitive performance.",
            "Magnesium": "Oxygen transport, energy production, supports neurological function and energy metabolism.",
            "Zinc": "Oxygen transport, energy production, supports neurological function and energy metabolism.",
            "Iron": "Supports oxygen delivery and enhances attention, memory, and cognitive function."
        },
        "happy": {
            "Protein": "Provides tryptophan as a precursor to serotonin; supports mood elevation when consumed with carbohydrates.",
            "Carbohydrates": "Boosts insulin, promotes tryptophan uptake in brain, thereby increasing serotonin synthesis.",
            "Vitamin D": "Modulates serotonin production; associated with positive mood and emotional well-being.",
            "Polyunsaturated Fats": "Regulates emotion, reduces cortisol, enhances mood stability and cognitive function.",
            "Magnesium": "Regulates neurotransmitters; promotes calm, positive mood and reduces mild emotional imbalance."
        },
        "surprise": {
            "Carbohydrates": "Provides immediate energy; enhances alertness and attention in response to novelty or stimulus.",
            "Vitamin B1": "Supports energy metabolism and neurotransmitter synthesis under acute cognitive demand.",
            "Vitamin B2": "Supports energy metabolism and neurotransmitter synthesis under acute cognitive demand.",
            "Vitamin B3": "Supports energy metabolism and neurotransmitter synthesis under acute cognitive demand.",
            "Vitamin B5": "Supports energy metabolism and neurotransmitter synthesis under acute cognitive demand.",
            "Vitamin B6": "Supports energy metabolism and neurotransmitter synthesis under acute cognitive demand.",
            "Vitamin B12": "Supports energy metabolism and neurotransmitter synthesis under acute cognitive demand.",
            "Protein": "Provides tyrosine as a precursor for dopamine and norepinephrine, enhancing cognitive speed and motivation.",
            "Vitamin C": "Modulate neuroimmune function; contribute to mood regulation and acute cognitive response.",
            "Vitamin D": "Modulate neuroimmune function; contribute to mood regulation and acute cognitive response."
        },
        "disgust": {
            "Dietary Fiber": "Improves gut motility, binds toxins, restores digestive comfort after visceral or food-related disgust.",
            "Magnesium": "Calms visceral tension; may reduce nausea, gut reactivity and somatic response to aversive stimuli.",
            "Zinc": "Supports mucosal healing, immune modulation, and gut-brain axis recovery after nausea/discomfort.",
            "Vitamin B6": "Supports GABA synthesis; may alleviate visceral discomfort linked to disgust."
        },
        "angry": {
            "Magnesium": "Calms the nervous system via GABA regulation; reduces excitability and stress-induced aggression.",
            "Vitamin C": "Reduces oxidative stress and cortisol; supports adrenal balance under emotional reactivity."
        }
    }

    def __init__(self):
        # Load only the explanation templates - no need for nutritional_facts.json anymore
        template_path = Path(__file__).parent / "explanation_templates.json"
        
        try:
            with open(template_path, 'r') as f:
                self.templates = json.load(f)
            
            print("✅ Explanation AI loaded successfully")
        except Exception as e:
            print(f"❌ Error loading Explanation AI: {e}")
            self.templates = {}
    
    def get_emotion_explanation(self, emotion):
        """Generate explanation about the relationship between emotion and nutrition"""
        if emotion not in self.templates.get('emotions', {}):
            emotion = 'neutral'
            
        templates = self.templates.get('emotions', {}).get(emotion, [])
        if not templates:
            return "Your emotional state can be influenced by what you eat."
            
        return random.choice(templates)
    
    def get_nutrient_explanation(self, nutrient, emotion):
        """Generate explanation about the effect of a nutrient on emotion based on Appendix A"""
        emotion_lower = emotion.lower()
        
        if emotion_lower in self.MOOD_NUTRIENTS_MAP:
            for nutrient_name, explanation in self.MOOD_NUTRIENTS_MAP[emotion_lower].items():
                # Check if the nutrient matches or is contained in the nutrient name
                if nutrient.lower() == nutrient_name.lower() or nutrient.lower() in nutrient_name.lower():
                    return explanation
        
        # If no specific explanation is found, return a generic response
        return f"{nutrient} is an important nutrient that can support your overall well-being."
    
    def get_priority_nutrients_for_emotion(self, emotion, nutrition_data):
        """Find priority nutrients for the given emotion from the food's nutrition data"""
        priority_nutrients = []
        emotion_lower = emotion.lower()
        
        # Get the priority nutrients list from EMOTION_PRIORITY_NUTRIENTS
        from models.food_recommendation_model import EMOTION_PRIORITY_NUTRIENTS
        ordered_nutrients = EMOTION_PRIORITY_NUTRIENTS.get(emotion_lower, [])
        
        if emotion_lower in self.MOOD_NUTRIENTS_MAP:
            # Get the priority nutrients for this emotion
            emotion_nutrients = self.MOOD_NUTRIENTS_MAP[emotion_lower]
            
            # Process nutrients in the order defined in EMOTION_PRIORITY_NUTRIENTS
            for nutrient_name in ordered_nutrients:
                if nutrient_name in emotion_nutrients:
                    # Look for this nutrient in the food's nutrition data
                    for food_nutrient in nutrition_data.keys():
                        if (nutrient_name.lower() == food_nutrient.lower() or 
                            nutrient_name.lower() in food_nutrient.lower()):
                            priority_nutrients.append({
                                "name": nutrient_name,  # Use the canonical name from the priority list
                                "value": nutrition_data[food_nutrient],
                                "explanation": emotion_nutrients[nutrient_name]
                            })
                            break
        
        # Return all priority nutrients in the correct order
        return priority_nutrients
    
    def get_food_explanation(self, food_name, food_type, emotion, priority_nutrients):
        """Generate explanation for why this food is recommended"""
        templates = self.templates.get('food_recommendations', [])
        if not templates:
            return f"This {food_type} is recommended because it contains nutrients that may help with your {emotion} mood."
            
        template = random.choice(templates)
        
        # Create nutrient list as string (e.g., "Vitamin C, Magnesium, and Zinc")
        nutrient_names = [n["name"] for n in priority_nutrients]
        
        if len(nutrient_names) == 1:
            nutrient_text = nutrient_names[0]
        elif len(nutrient_names) == 2:
            nutrient_text = f"{nutrient_names[0]} and {nutrient_names[1]}"
        else:
            nutrient_text = ", ".join(nutrient_names[:-1]) + f", and {nutrient_names[-1]}"
            
        # Fill in the template
        explanation = template.format(
            food_name=food_name,
            food_type=food_type,
            emotion=emotion,
            nutrients=nutrient_text
        )
        
        return explanation
    
    @classmethod
    def explain_recommendation(cls, recommendation, user_data):
        """Generate comprehensive explanation for food recommendation"""
        explainer = cls()
        
        if not recommendation:
            return {
                "error": "No recommendation provided to explain"
            }
        
        food_name = recommendation.get('food', '')
        food_type = recommendation.get('type', '')
        emotion = user_data.get('emotion', 'neutral')
        nutrition_data = recommendation.get('nutrition_data', {})
        
        # Generate overview explanation
        emotion_explanation = explainer.get_emotion_explanation(emotion)
        
        # Get priority nutrients for this emotion from the food's nutrition data
        priority_nutrients = explainer.get_priority_nutrients_for_emotion(emotion, nutrition_data)
        
        # Generate food explanation
        food_explanation = explainer.get_food_explanation(
            food_name, food_type, emotion, priority_nutrients
        )
        
        # Generate summary based on scientific data
        scientific_summary = f"Based on nutritional research, {food_name} contains key nutrients that can positively impact your {emotion} state."
        
        if len(priority_nutrients) > 0:
            scientific_summary += f" Specifically, {priority_nutrients[0]['name']} has been shown to {priority_nutrients[0]['explanation'].lower()[0].lower() + priority_nutrients[0]['explanation'].lower()[1:]}"
        
        # Compile results
        return {
            "food_name": food_name,
            "food_type": food_type,
            "emotion_explanation": emotion_explanation,
            "food_explanation": food_explanation,
            "priority_nutrients": priority_nutrients,
            "scientific_summary": scientific_summary
        }