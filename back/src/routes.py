import os
import cloudinary.uploader
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from models import User, Evento, participantes_table


api = Blueprint("api", __name__)


@api.route('/register', methods=['POST'])
def register():
    
    email = request.form.get("email")
    password = request.form.get("password")
    usuario = request.form.get("usuario")
    nombre = request.form.get("nombre")
    edad = request.form.get("edad")
    sexo = request.form.get("sexo")
    genero = request.form.get("genero")
    biography = request.form.get("biography", "")  
    
    
    if "profilePicture" not in request.files:
        return jsonify({"error": "La imagen de perfil es obligatoria"}), 400

    profile_picture = request.files["profilePicture"]

    # Validar que los demás campos requeridos no estén vacíos
    required_fields = [email, password, usuario, nombre, edad, sexo, genero]
    if any(field is None or field.strip() == "" for field in required_fields):
        return jsonify({"error": "Todos los campos obligatorios deben ser completados"}), 400

    # Verificar si el email ya existe en la base de datos
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "El email ya está registrado"}), 400

    # Subir la imagen a Cloudinary
    try:
        upload_result = cloudinary.uploader.upload(profile_picture, folder="crewup")
        image_url = upload_result["secure_url"]  
    except Exception as e:
        return jsonify({"error": "Error al subir la imagen", "details": str(e)}), 500

    
    new_user = User(
        email=email,
        usuario=usuario,
        nombre=nombre,
        edad=int(edad),  
        sexo=sexo,
        genero=genero,
        biography=biography,
        profilePicture=image_url  
    )

    
    new_user.password = generate_password_hash(password)

    
    try:
        new_user.save()
        access_token = create_access_token(identity=new_user.id) 
        return jsonify({
            "message": "Usuario registrado exitosamente",
            "user": new_user.serialize(),
            "access_token": access_token
        }), 200
    except Exception as e:
        return jsonify({"error": "Ocurrió un error al registrar el usuario", "details": str(e)}), 500


@api.route('/login', methods=['POST'])
def login():
    
    email= request.json.get('email')
    password = request.json.get('password')
    
    if not email:
        return jsonify({ "error": "El email es requerido"}), 400
    if not password:
        return jsonify({"error": "La constraseña es requerida"}), 400
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({ "error": "Datos incorrectos"}), 401
    if not user.verify_password(password):
        return jsonify({ "error": "Datos incorrectos"}), 401
    
    access_token = create_access_token(identity=str(user.id))
    
    datos = {
        "access_token": access_token
    }
    
    return jsonify(datos), 200

@api.route('/evento', methods=['POST'])
@jwt_required()
def crear_evento():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    data = request.get_json()

    required_fields = ["nombre_evento", "ubicacion", "fecha_hora", "category"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Falta el campo requerido: {field}"}), 400

    # Validaciones para los nuevos filtros
    edad_min = data.get("edad_min")
    edad_max = data.get("edad_max")
    sexo_permitido = data.get("sexo_permitido", "No importa")
    genero_permitido = data.get("genero_permitido", "No importa")

    if edad_min and edad_max and edad_min > edad_max:
        return jsonify({"error": "La edad mínima no puede ser mayor que la edad máxima"}), 400

    if sexo_permitido not in ["Masculino", "Femenino", "Intersexual", "No importa"]:
        return jsonify({"error": "Valor de sexo inválido"}), 400

    if genero_permitido not in ["Hombre", "Mujer", "No Binario", "Otro", "No importa"]:
        return jsonify({"error": "Valor de género inválido"}), 400

    nuevo_evento = Evento(
        organizador=current_user_id,
        nombre_evento=data["nombre_evento"],
        ubicacion=data["ubicacion"],
        fecha_hora=data["fecha_hora"],
        dinero=data.get("dinero"),
        category=data["category"],
        description=data.get("description"),
        edad_min=edad_min,
        edad_max=edad_max,
        sexo_permitido=sexo_permitido,
        genero_permitido=genero_permitido
    )

    try:
        nuevo_evento.save()
        return jsonify(nuevo_evento.serialize()), 200
    except Exception as e:
        return jsonify({"error": "Error al crear el evento", "detalle": str(e)}), 500
