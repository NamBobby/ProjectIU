from flask import Flask, request, jsonify
from predict import get_chatbot_reply, get_sentiment
import torch

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict_response():
    """
    Endpoint for predicting chatbot responses based on user input
    
    Expected input:
    {
        "features": ["user message here"]
    }
    
    Returns:
    {
        "prediction": ["bot response here"],
        "intent": "intent_label"
    }
    """
    data = request.get_json()
    features = data.get("features", [])
    if not features:
        return jsonify({"error": "Missing features"}), 400

    try:
        reply, intent = get_chatbot_reply(features)
        return jsonify({
            "prediction": [reply],
            "intent": intent
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/sentiment", methods=["POST"])
def predict_sentiment():
    """
    Endpoint for sentiment analysis of user input
    
    Expected input:
    {
        "text": "user message here"
    }
    
    Returns:
    {
        "sentiment": "Positive/Negative/Neutral"
    }
    """
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "Missing text"}), 400

    try:
        sentiment = get_sentiment(text)
        return jsonify({"sentiment": sentiment})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Using {device} for inference")
    
    app.run(host="0.0.0.0", port=5001)  