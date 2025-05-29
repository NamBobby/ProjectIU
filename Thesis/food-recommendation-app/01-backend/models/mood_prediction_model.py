from transformers import AutoImageProcessor, AutoModelForImageClassification
import torch
from PIL import Image
import io

#  Load model once when importing module
processor = AutoImageProcessor.from_pretrained("dima806/facial_emotions_image_detection")
model = AutoModelForImageClassification.from_pretrained("dima806/facial_emotions_image_detection")

# List of emotions the model can recognize
EMOTION_LABELS = ["angry", "disgust", "fear", "happy", "neutral", "sad", "surprise"]

def predict_emotion(image_bytes):
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        # Image preprocessing
        inputs = processor(image, return_tensors="pt")

        # Emotional Prediction
        with torch.no_grad():
            outputs = model(**inputs)

        # Get the highest probability prediction sentiment
        predicted_class = torch.argmax(outputs.logits, dim=-1).item()
        predicted_emotion = EMOTION_LABELS[predicted_class]

        return predicted_emotion
    except Exception as e:
        print(f"❌ Error prediction proccess: {e}")
        return None
