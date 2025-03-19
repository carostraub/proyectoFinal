import cloudinary
import os
from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db, Category
from routes import api
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

app = Flask(__name__)
app.config['DEBUG'] = True 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL') 
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET') 
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=2)

db.init_app(app)
Migrate(app, db)
jwt = JWTManager(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True) #el frontend es `http://localhost:5173`

@app.route('/')
def main():
    return jsonify({"message": "REST API FLASK"}), 200

app.register_blueprint(api, url_prefix="/api")


#  Función para inicializar categorías por defecto
def initialize_categories():
    """Crea las categorías básicas si no existen en la base de datos."""
    categorias_por_defecto = [
        {"categoria": "Sports", "titulo": "Eventos Deportivos", "description1": "Encuentra rivales y compañeros.", "description2": "Juega con personas nuevas!", "url": "/createsport"},
        {"categoria": "Events", "titulo": "Eventos Generales", "description1": "Organiza reuniones y conciertos.", "description2": "Busca tu acompañante ideal.", "url": "/createevent"},
        {"categoria": "Security", "titulo": "Seguridad Personal", "description1": "Encuentra un compañero para viajes seguros.", "description2": "Evita trayectos peligrosos.", "url": "/createsecurity"},
        {"categoria": "Other", "titulo": "Otros Eventos", "description1": "Actividades diversas y hobbies.", "description2": "Encuentra personas con intereses similares.", "url": "/createother"}
    ]

    for categoria_data in categorias_por_defecto:
        existente = Category.query.filter_by(categoria=categoria_data["categoria"]).first()
        if not existente:
            nueva_categoria = Category(**categoria_data)
            db.session.add(nueva_categoria)

    db.session.commit()
    print("✅ Categorías inicializadas correctamente.")


if __name__ == '__main__':
    with app.app_context():
        initialize_categories()  # Llamamos a la función para inicializar categorías
    app.run(host="127.0.0.1", port=5000, debug=True)
