from flask import Flask
from flask_cors import CORS
from database.config import Config
from database.db_init import db, init_db  
from api.routes import auth_api, emotion_api, food_api, explanation_api, admin_api

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db.init_app(app)  

# Initialize database when app is created - this will run with 'flask run'
with app.app_context():
    init_db()

app.register_blueprint(auth_api, url_prefix='/api/auth')
app.register_blueprint(emotion_api, url_prefix='/api/emotion')
app.register_blueprint(food_api, url_prefix='/api/food')
app.register_blueprint(explanation_api, url_prefix='/api/explanation')
app.register_blueprint(admin_api, url_prefix='/api/admin')

@app.route("/")
def home():
    return "✅ Flask & PostgreSQL & AI Model Connected Successfully!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)