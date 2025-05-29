# Chatbot API with Flask

This project provides a Flask-based REST API for a chatbot with intent recognition and sentiment analysis capabilities.

## Project Structure

- `app.py`: Main Flask application with API endpoints
- `predict.py`: Core functionality for intent recognition and sentiment analysis
- `models/`: Directory containing trained models
- `database/`: Directory containing response mappings

### Watch the Project Setup Tutorial video (if needed): 
https://drive.google.com/file/d/1Ccm2Lc32gt_nFyGsegXB5RryT8_WYCeQ/view?usp=sharing

## Setup Instructions

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Download required model and data files (MUST DO)
1. Access Google Drive: https://drive.google.com/drive/folders/1_Q1YMAzXi6IJqT4tS5I554Y6hLFII9oC?usp=sharing
2. From the `database` folder, download `response_mapping.csv` and place it in the `database` directory within `01B-flask`
3. From the `models` folder, download all 4 files: `chatbot_model.pkl`, `sentiment_model.pkl`, `label_encoder.pkl`, `sentiment_label_encoder.pkl` and place them in the `model` directory within `01B-flask`

## Installation (MUST DO)

Clone the repository to your local machine, then follow the platform-specific instructions below.

1. Navigate to the project directory in your terminal.
2. Navigate to `01B-flask` directory following this command: `cd 01-backend/01B-flask/`

### macOS Setup

3. **Create a virtual environment**:
   `python3 -m venv venv`

4. **Activate the virtual environment**:
   `source venv/bin/activate`

5. **Install dependencies**:
   `pip install -r requirements.txt`

6. **Run the Flask application**:
 `  python app.py`

### Windows Setup

3. **Install dependencies**:
   `pip install -r requirements.txt`

4. **Run the Flask application**:

   `python app.py`


