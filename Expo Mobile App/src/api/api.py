from flask import Flask, request, jsonify, send_from_directory, render_template
from flask_cors import CORS
import torch
import torch.nn as nn
from torchvision import transforms, models
from PIL import Image
import os
from train import *

app = Flask(__name__)
CORS(app)

# Load the saved model
num_classes = 4
loaded_model = models.resnet18(weights=None)
loaded_model.avgpool = nn.Sequential(
    nn.AdaptiveAvgPool2d(1),
    CBAM(channels=loaded_model.fc.in_features)
)
loaded_model.fc = nn.Linear(loaded_model.fc.in_features, num_classes)

# Xác định đường dẫn tuyệt đối của file api.py
current_dir = os.path.dirname(os.path.abspath(__file__))

# Xây dựng đường dẫn tương đối đến file resnet_model.pth
model_path = os.path.join(current_dir, 'resnet_model', 'resnet_CBAM.pth')

# Sử dụng đường dẫn tương đối để tải state dictionary
state_dict = torch.load(model_path, map_location=torch.device('cpu'))

# Remove the keys corresponding to the additional layers
state_dict = {k: v for k, v in state_dict.items() if k in loaded_model.state_dict()}

# Load the modified state dictionary into the model
loaded_model.load_state_dict(state_dict, strict=False)

# Move the model to the device
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
loaded_model = loaded_model.to(device)

# Set the model to evaluation mode
loaded_model.eval()

# Define the transformations for preprocessing the image
transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

predicted_label = None

@app.route('/process', methods=['POST', 'GET'])
def process_endpoint():
    global predicted_label
    image_filename = 'image.jpg'

    if request.method == 'POST':
        if 'image' not in request.files:
            return jsonify({'error': 'No image found'})

        # Get the image file from the POST request
        image_file = request.files['image']
        try:
            # Open and preprocess the image
            image = Image.open(image_file)

            # Check the file format and convert to RGB if necessary
            if image.format != 'JPEG':
                image = image.convert('RGB')

            # Save the image
            image_path = f'static/images/{image_filename}'
            image.save(image_path, format='JPEG', quality=90)
            # Resize and transform the image
            image = transform(image).unsqueeze(0).to(device)

            # Perform inference on the image
            output = loaded_model(image)
            _, predicted_class = torch.max(output, 1)
            predicted_class = predicted_class.item()
            class_names = ["level_0", "level_1", "level_2", "level_3"]
            predicted_label = class_names[predicted_class]

            # Return the predicted label, image path, and as JSON
            return jsonify({'predicted_class': predicted_label ,'image_path': image_path})
        except Exception as e:
            return jsonify({'error': str(e)})
    elif request.method == 'GET':
        if predicted_label is not None:
            return render_template('result.html', predicted_class=predicted_label)
        else:
            return jsonify({'error': 'No prediction available'})
    else:
        return jsonify({'error': 'Method not allowed'}), 405
    
@app.route('/static/images/<path:filename>')
def get_image(filename):
    return send_from_directory(os.path.join(current_dir, 'static', 'images'), filename)

if __name__ == '__main__':
    app.run(host='192.168.100.6', port=5000)
