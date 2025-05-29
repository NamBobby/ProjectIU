import pickle
import os
import torch
import numpy as np
import pandas as pd
from transformers import BertTokenizer
import io
from sklearn.preprocessing import LabelEncoder

# Determine the device to use
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using {device} for inference")

# Load models
MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")
DATABASE_DIR = os.path.join(os.path.dirname(__file__), "database")

os.makedirs(DATABASE_DIR, exist_ok=True)

# Define a flexible loading function that tries multiple approaches
def flexible_model_load(file_path):
    """Try multiple approaches to load a model file"""
    print(f"Attempting to load model from {file_path}")
    
    # Approach 1: Try regular pickle load first
    try:
        print("Attempt #1: Regular pickle load")
        with open(file_path, "rb") as f:
            model = pickle.load(f)
            print("Success! Model loaded with regular pickle")
            # If it's a PyTorch model, move it to the right device
            if hasattr(model, 'to') and callable(getattr(model, 'to')):
                model = model.to(device)
                print(f"Model moved to {device}")
            return model
    except Exception as e:
        print(f"Attempt #1 failed: {str(e)}")
    
    # Approach 2: Try torch.load with CPU mapping
    try:
        print("Attempt #2: torch.load with CPU mapping")
        model = torch.load(file_path, map_location=torch.device('cpu'), weights_only=False)
        print("Success! Model loaded with torch.load and CPU mapping")
        return model
    except Exception as e:
        print(f"Attempt #2 failed: {str(e)}")
    
    # Approach 3: Try loading with io.BytesIO
    try:
        print("Attempt #3: torch.load with BytesIO")
        with open(file_path, "rb") as f:
            buffer = io.BytesIO(f.read())
            model = torch.load(
                buffer, 
                map_location=torch.device('cpu'),
                weights_only=False
            )
            print("Success! Model loaded with BytesIO approach")
            return model
    except Exception as e:
        print(f"Attempt #3 failed: {str(e)}")
    
    # Approach 4: Try loading with pickle and special handling for CUDA tensors
    try:
        print("Attempt #4: Custom deserialization")
        # Define a custom unpickler that handles CUDA tensors
        class CPUUnpickler(pickle.Unpickler):
            def find_class(self, module, name):
                if module == 'torch.storage' and name == '_load_from_bytes':
                    return lambda b: torch.load(io.BytesIO(b), map_location='cpu')
                return super().find_class(module, name)
        
        with open(file_path, "rb") as f:
            model = CPUUnpickler(f).load()
            print("Success! Model loaded with custom unpickler")
            return model
    except Exception as e:
        print(f"Attempt #4 failed: {str(e)}")
    
    # If all approaches fail, raise a comprehensive error
    raise RuntimeError(f"Failed to load model from {file_path} using multiple approaches")

# Define a function to safely load and wrap label encoders
def load_and_prepare_label_encoder(file_path):
    """Load a label encoder and ensure it has inverse_transform method"""
    try:
        with open(file_path, "rb") as f:
            encoder_data = pickle.load(f)
            
        # Check if it's a NumPy array (classes_) or already a LabelEncoder
        if isinstance(encoder_data, np.ndarray):
            print(f"Loaded label classes from {file_path}, wrapping in LabelEncoder")
            encoder = LabelEncoder()
            encoder.classes_ = encoder_data
            return encoder
        elif hasattr(encoder_data, 'inverse_transform'):
            print(f"Loaded LabelEncoder from {file_path}")
            return encoder_data
        else:
            print(f"Unknown encoder type from {file_path}, attempting to adapt")
            encoder = LabelEncoder()
            # Try to extract classes from different possible formats
            if hasattr(encoder_data, 'classes_'):
                encoder.classes_ = encoder_data.classes_
            elif isinstance(encoder_data, (list, tuple)):
                encoder.classes_ = np.array(encoder_data)
            else:
                raise ValueError(f"Cannot extract classes from {type(encoder_data)}")
            return encoder
    except Exception as e:
        print(f"Error loading label encoder: {str(e)}")
        raise

# Load models with flexible loader
try:
    intent_model = flexible_model_load(os.path.join(MODEL_DIR, "chatbot_model.pkl"))
    print("Successfully loaded intent model")
except Exception as e:
    print(f"Error loading intent model: {str(e)}")
    raise

# Load intent label encoder with special handling
try:
    intent_label_encoder = load_and_prepare_label_encoder(os.path.join(MODEL_DIR, "label_encoder.pkl"))
    print("Successfully loaded intent label encoder")
    print(f"Available intent labels: {intent_label_encoder.classes_}")
except Exception as e:
    print(f"Error loading intent label encoder: {str(e)}")
    raise

# Load sentiment model
try:
    sentiment_model = flexible_model_load(os.path.join(MODEL_DIR, "sentiment_model.pkl"))
    print("Successfully loaded sentiment model")
except Exception as e:
    print(f"Error loading sentiment model: {str(e)}")
    raise

# Load sentiment label encoder with special handling
try:
    sentiment_label_encoder = load_and_prepare_label_encoder(os.path.join(MODEL_DIR, "sentiment_label_encoder.pkl"))
    print("Successfully loaded sentiment label encoder")
    print(f"Available sentiment labels: {sentiment_label_encoder.classes_}")
except Exception as e:
    print(f"Error loading sentiment label encoder: {str(e)}")
    raise

# Load tokenizer
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
print("Successfully loaded tokenizer")

# Load dataset for responses or use response mapping from CSV
response_data = None

def load_response_data():
    global response_data
    
    # Load from local CSV
    csv_path = os.path.join(DATABASE_DIR, "response_mapping.csv")
    if os.path.exists(csv_path):
        response_data = pd.read_csv(csv_path)
        print(f"Loaded response mapping from {csv_path}")
        return
    
    # If CSV doesn't exist, create a fallback mapping
    print("Response mapping CSV not found, creating fallback responses")
    # Be cautious with accessing classes_
    intent_classes = intent_label_encoder.classes_ if hasattr(intent_label_encoder, 'classes_') else []
    response_data = pd.DataFrame({
        "intent": intent_classes,
        "response": [f"I understand your intent is about {intent}. How can I help you with that?" 
                    for intent in intent_classes]
    })
    
    # Save the fallback mapping for future use
    response_data.to_csv(csv_path, index=False)
    print(f"Created fallback response mapping and saved to {csv_path}")

# Load response data when module is imported
load_response_data()

def get_response_for_intent(intent):
    """Get a response for the given intent from the dataset"""
    if response_data is None:
        load_response_data()
        
    # Filter for the specific intent
    matching_rows = response_data[response_data["intent"] == intent]
    
    if len(matching_rows) > 0:
        # Get a random response for this intent
        response = matching_rows.sample(1)["response"].values[0]
        return response
    else:
        # Fallback response if intent not found
        return f"I understand your intent is about {intent}. How can I help you with that?"

def get_chatbot_reply(features):
    """
    Predict intent and generate response based on user input
    
    Args:
        features: List containing the user message
    
    Returns:
        str: Generated response, intent
    """
    user_input = features[0]
    
    # Tokenize input text
    inputs = tokenizer(user_input, return_tensors="pt", truncation=True, padding=True, max_length=128)
    # Move inputs to the correct device
    inputs = {k: v.to(device) for k, v in inputs.items()}
    
    # Get model predictions for intent
    with torch.no_grad():
        output = intent_model(**inputs)
        predicted_intent_idx = torch.argmax(output.logits, axis=1).item()
    
    # Convert numerical prediction to intent label
    try:
        predicted_intent = intent_label_encoder.inverse_transform([predicted_intent_idx])[0]
    except Exception as e:
        print(f"Error in inverse_transform: {str(e)}")
        # Fallback: try to retrieve directly from classes_ array
        if hasattr(intent_label_encoder, 'classes_') and predicted_intent_idx < len(intent_label_encoder.classes_):
            predicted_intent = intent_label_encoder.classes_[predicted_intent_idx]
        else:
            predicted_intent = "unknown"
    
    # Get response for the predicted intent
    response = get_response_for_intent(predicted_intent)
    
    return response, predicted_intent

def get_sentiment(text):
    """
    Analyze the sentiment of a text
    
    Args:
        text: User input text
    
    Returns:
        str: Sentiment (Positive, Negative, or Neutral)
    """
    # Clean the text (similar to training)
    cleaned_text = text.lower()
    
    # Tokenize the text
    inputs = tokenizer(cleaned_text, return_tensors="pt", padding=True, truncation=True, max_length=64)
    
    # Move inputs to the correct device
    inputs = {k: v.to(device) for k, v in inputs.items()}
    
    # Remove token_type_ids if present (DistilBERT doesn't use them)
    if 'token_type_ids' in inputs:
        print("Removing token_type_ids for DistilBERT compatibility")
        inputs.pop('token_type_ids')
    
    # Get model predictions
    try:
        with torch.no_grad():
            outputs = sentiment_model(**inputs)
            probabilities = torch.nn.functional.softmax(outputs.logits, dim=1)
            predicted_class = torch.argmax(probabilities, dim=1).item()
        
        # Map prediction to sentiment label with error handling
        try:
            sentiment = sentiment_label_encoder.inverse_transform([predicted_class])[0]
        except Exception as e:
            print(f"Error in sentiment inverse_transform: {str(e)}")
            # Fallback: try to retrieve directly from classes_ array
            if hasattr(sentiment_label_encoder, 'classes_') and predicted_class < len(sentiment_label_encoder.classes_):
                sentiment = sentiment_label_encoder.classes_[predicted_class]
            else:
                sentiment = "neutral"  # Default fallback
        
        return sentiment
    
    except Exception as e:
        print(f"Error in sentiment prediction: {str(e)}")
        # In case of any error, return a neutral sentiment
        return "neutral"