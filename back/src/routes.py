import os
import cloudinary.uploader
from flask_cors import cross_origin
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from models import User, Evento, participantes_table, db, Estatus, Category
from datetime import datetime


api = Blueprint("api", __name__)


@api.route('/register', methods=['POST'])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
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
        access_token = create_access_token(identity=str(new_user.id)) 
        return jsonify({
            "message": "Usuario registrado exitosamente",
            "user": new_user.serialize(),
            "access_token": access_token
        }), 200
    except Exception as e:
        return jsonify({"error": "Ocurrió un error al registrar el usuario", "details": str(e)}), 500


@api.route('/login', methods=['POST'])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
def login():
    
    email= request.json.get('email')
    password = request.json.get('password')
    
    if not email:
        return jsonify({ "error": "El email es requerido"}), 400
    if not password:
        return jsonify({"error": "La constraseña es requerida"}), 400
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({ "error": "Datos incorrectos"}), 400
    if not user.verify_password(password):
        return jsonify({ "error": "Datos incorrectos"}), 400
    
    access_token = create_access_token(identity=str(user.id))
    
    return jsonify({
        "access_token": access_token,
        "user": user.serialize()  #  Enviar también los datos del usuario
    }), 200



@api.route('/evento', methods=['POST'])
@cross_origin()
@jwt_required()
def crear_evento():
    current_user_id = int(get_jwt_identity())
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    data = request.get_json()

    required_fields = ["nameEvent", "location", "date", "time", "category"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Falta el campo requerido: {field}"}), 400

    # Validaciones de edad, sexo y género
    edad_min = data.get("ageRange.edadMin")
    edad_max = data.get("ageRange.edadMax")
    sexo_permitido = data.get("sex", "No importa")
    genero_permitido = data.get("gender", "No importa")

    if edad_min and edad_max and edad_min > edad_max:
        return jsonify({"error": "La edad mínima no puede ser mayor que la edad máxima"}), 400

    category = Category.query.get(data["category"])
    if not category:
        return jsonify({"error": "Categoría no válida"}), 400

    hora_str = data["time"]
    try:
        if len(hora_str) == 5:  # Formato "HH:MM"
            hora_obj = datetime.strptime(hora_str, "%H:%M").time()
        else:  # Formato "HH:MM:SS"
            hora_obj = datetime.strptime(hora_str, "%H:%M:%S").time()
    except ValueError:
        return jsonify({"error": "Formato de hora no válido"}), 400

    nuevo_evento = Evento(
        organizador_id=current_user_id,
        nombre_evento=data["nameEvent"],
        ubicacion=data["location"],
        fecha=data["date"],
        hora=hora_obj,
        dinero=data.get("payment"),
        category=data["category"],
        description=data.get("description"),
        edad_min=edad_min,
        edad_max=edad_max,
        sexo_permitido=sexo_permitido,
        genero_permitido=genero_permitido
    )

    try:
        db.session.add(nuevo_evento)
        db.session.commit()
        return jsonify(nuevo_evento.serialize()), 200
    except Exception as e:
        return jsonify({"error": "Error al crear el evento", "detalle": str(e)}), 500
    

@api.route('/myevents', methods=['GET'])
@jwt_required()
def mis_eventos():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    eventos = Evento.query.filter_by(organizador_id=current_user_id).all()
    eventos_serializados = [evento.serialize() for evento in eventos]

    return jsonify(eventos_serializados), 200


@api.route('/events', methods=['GET'])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
@jwt_required()
def obtener_eventos():
    
    current_user_id = int(get_jwt_identity())  # Obtener el ID del usuario autenticado
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    eventos = Evento.query.all()  # Obtener todos los eventos de la base de datos
    eventos_serializados = [evento.serialize() for evento in eventos]

    return jsonify(eventos_serializados), 200





@api.route('/evento/<int:evento_id>', methods=['GET'])
@jwt_required()
def mi_evento(evento_id):
    current_user_id = int(get_jwt_identity())
    user = User.query.get(current_user_id)
    evento = Evento.query.get(evento_id)
    
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    if not evento:
        return jsonify({"error": "Evento no encontrado"}), 404

    if evento.organizador_id != current_user_id:
        return jsonify({"error": "Este no es tu evento"}), 400

    response_data = {
        "id": evento.id,
        "nombre_evento": evento.nombre_evento,
        "categoria": evento.categoria.titulo,  
        "ubicacion": evento.ubicacion,
        "fecha": evento.fecha.strftime("%d/%m/%Y"),  
        "hora": evento.hora.strftime("%H:%M:%S"),  #  Solución al error de serialización
        "sexo_permitido": evento.sexo_permitido,
        "genero_permitido": evento.genero_permitido,
        "rango_edad": f"{evento.edad_min} - {evento.edad_max}" if evento.edad_min and evento.edad_max else "Sin restricción",
        "organizador": {
            "id": evento.organizador_user.id,
            "nombre": evento.organizador_user.nombre
        }
    }

    if evento.dinero:
        response_data["cuota"] = evento.dinero

    return jsonify(response_data), 200






@api.route('/evento/<int:evento_id>', methods=['DELETE'])
@jwt_required()
def borrar_evento(evento_id):
    current_user_id = int(get_jwt_identity())
    evento = Evento.query.get(evento_id)
    
    if not evento:
        return jsonify({"error": "Evento no encontrado"}), 404

    if evento.organizador_id != current_user_id:
        return jsonify({"error": "No tienes permiso para borrar este evento"}), 400
    
    evento.delete()
    return jsonify({"message": "Evento eliminado correctamente"}), 200

@api.route('/profile', methods=['GET'])
@jwt_required()
def mi_perfil():
    current_user_id = int(get_jwt_identity())
    try:
        current_user_id = int(current_user_id)
    except ValueError:
        return jsonify({"error": "ID de usuario inválido"}), 400

    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    return jsonify(user.serialize()), 200


@api.route('/profile', methods=['PATCH'])
@jwt_required()
def actualizar_biografia():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    new_biography = request.form.get("biography")  # Recibir la biografía

    if new_biography is None:
        return jsonify({"error": "No se proporcionó una biografía"}), 400

    user.biography = new_biography  #  Actualizar la biografía

    try:
        user.update()
        return jsonify({
            "message": "Biografía actualizada con éxito",
            "user": user.serialize()
        }), 200
    except Exception as e:
        return jsonify({"error": "Error al actualizar la biografía", "details": str(e)}), 500



@api.route('/eventos_disponibles', methods=['POST'])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
@jwt_required()
def eventos_disponibles():
    current_user_id = int(get_jwt_identity())
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    data = request.get_json()  # filtros personalizados
    categoria = data.get("categoria")
    ubicacion = data.get("ubicacion")

    # Buscar eventos donde el usuario NO sea el organizador y cumpla los filtros
    query = Evento.query.filter(
        Evento.organizador_id != current_user_id,  
        ((Evento.edad_min <= user.edad) | (Evento.edad_min == None)),  
        ((Evento.edad_max >= user.edad) | (Evento.edad_max == None)),  
        ((Evento.sexo_permitido == user.sexo) | (Evento.sexo_permitido == "No importa")), 
        ((Evento.genero_permitido == user.genero) | (Evento.genero_permitido == "No importa")) 
    )

    # Aplicar filtros adicionales 
    if categoria:
        query = query.filter(Evento.category == categoria)

    if ubicacion:
        query = query.filter(Evento.ubicacion.ilike(f"%{ubicacion}%"))

    eventos_filtrados = query.all()
    eventos_serializados = [evento.serialize() for evento in eventos_filtrados]

    return jsonify({"eventos_disponibles": eventos_serializados}), 200




@api.route('/gestionar_postulacion/<int:evento_id>', methods=['PATCH'])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
@jwt_required()
def postular_evento(evento_id):
    current_user_id = int(get_jwt_identity())
    user = User.query.get(current_user_id)
    evento = Evento.query.get(evento_id)

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    if not evento:
        return jsonify({"error": "Evento no encontrado"}), 404

    if evento.organizador_id == current_user_id:
        return jsonify({"error": "No puedes postularte a tu propio evento"}), 400

    
    participante_existente = db.session.query(participantes_table).filter_by(
        id_usuario=current_user_id, id_evento=evento_id).first()

    if participante_existente:
        return jsonify({"error": "Ya estás postulado a este evento"}), 400

    # estado "POSTULANTE"
    stmt = participantes_table.insert().values(
    id_usuario=current_user_id,
    id_evento=evento_id,
    estatus=Estatus.POSTULANTE
)
    db.session.execute(stmt)
    db.session.commit()

    return jsonify({"message": "Te has postulado al evento exitosamente"}), 200



@api.route('/gestionar_postulacion/<int:evento_id>/<int:user_id>', methods=['PATCH'])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
@jwt_required()
def gestionar_postulacion(evento_id, user_id):
    current_user_id = int(get_jwt_identity())
    evento = Evento.query.get(evento_id)
    user = User.query.get(user_id)

    if not evento:
        return jsonify({"error": "Evento no encontrado"}), 404

    if evento.organizador_id != current_user_id:
        return jsonify({"error": "No tienes permiso para gestionar este evento"}), 400

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    data = request.get_json()
    nuevo_estatus = data.get("estatus")

    if nuevo_estatus not in ["PARTICIPANTE", "RECHAZADO"]:
        return jsonify({"error": "Estatus no válido"}), 400

    # Actualizar el estatus 
    stmt = participantes_table.update().where(
        (participantes_table.c.id_usuario == user_id) &
        (participantes_table.c.id_evento == evento_id)
    ).values(estatus=Estatus[nuevo_estatus])

    db.session.execute(stmt)
    db.session.commit()

    return jsonify({"message": f"El usuario ha sido {nuevo_estatus} en el evento"}), 200




@api.route('/setting/<int:user_id>', methods=['PATCH'])
@jwt_required()
def setting(user_id):
    current_user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    if user.id != current_user_id:
        return jsonify({"error": "No puedes editar este perfil"}), 400

    # Obtener los valores del formulario
    new_username = request.form.get("usuario", "").strip()
    new_password = request.form.get("password")
    new_profile_picture = request.files.get("profilePicture")

    # Validar que no se envíen valores vacíos
    if new_username:
        user.usuario = new_username

    if new_password and new_password.strip() != "":
        user.password = generate_password_hash(new_password)

    if new_profile_picture:
        try:
            upload_result = cloudinary.uploader.upload(new_profile_picture, folder="crewup_profiles")
            user.profilePicture = upload_result["secure_url"]
        except Exception as e:
            return jsonify({"error": "Error al subir la imagen", "details": str(e)}), 500

    try:
        user.update()
        return jsonify({
            "message": "Perfil actualizado con éxito",
            "user": user.serialize()
        }), 200
    except Exception as e:
        return jsonify({"error": "Error al actualizar perfil", "details": str(e)}), 500





@api.route('/categorias', methods=['POST'])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
@jwt_required()
def guardar_categorias():
    current_user_id = int(get_jwt_identity())
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

 
    data = request.get_json()  
    nueva_categoria=Category(
        categoria = data.get("categoria"),
        titulo = data.get("titulo"),
        description1=data.get("description1"),
        description2=data.get("description2"),
        url=data.get("url")
    )


    try:
        nueva_categoria.save()
        return jsonify(nueva_categoria.serialize()), 200
    except Exception as e:
        return jsonify({"error": "Error al crear el evento", "detalle": str(e)}), 500
    

@api.route('/categories', methods=['GET'])
@jwt_required()
def get_categories():
    current_user_id = int(get_jwt_identity())
    try:
        current_user_id = int(current_user_id)
    except ValueError:
        return jsonify({"error": "ID de usuario inválido"}), 400

    categories = Category.query.all()
    if categories == []:
        return jsonify({"error": "No existen categorias"}), 404
    resultado=list(map(lambda item:item.serialize(),categories))

    return jsonify(resultado), 200


