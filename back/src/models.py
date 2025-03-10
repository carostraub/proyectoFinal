import os
import sys
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, backref
from sqlalchemy import ForeignKey, Column, Integer, String, Table, Enum
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class estatus(Enum):
    PARTICIPANTE = 1
    RECHAZADO = 2
    POSTULANTE = 3

class category(Enum):
    DEPORTE = 1
    EVENTO =2
    SEGURIDAD= 3
    OTRO = 4


participantes_table = db.Table(
    'participantes',
    db.Column('id_usuario', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('id_evento', db.Integer, db.ForeignKey('eventos.id'), primary_key=True),
    db.Column('estatus', db.Enum(estatus), nullable=False)
)


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    usuario =db.Column(db.String, nullable=False)
    nombre =db.Column(db.String, nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    sexo = db.Column(db.String, nullable=False)
    genero = db.Column(db.String, nullable=False)
    biography = db.Column(db.String, default="")
    profilePicture = db.Column(db.String, default="", nullable=False)
    
    eventos_creados = relationship('Evento', backref=backref('organizador', uselist=False), cascade="all, delete-orphan")
    eventos_postulados = relationship('Evento', secondary=participantes_table, back_populates="participantes")
    
    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "usuario": self.usuario,
            "nombre": self.nombre,
            "edad": self.edad,
            "sexo":self.sexo,
            "genero": self.genero,
            "biography": self.biography,
            "profilePicture":self.profilePicture,
            "eventos_creados": [evento.serialize() for evento in self.eventos_creados],
            "eventos_postulados": [evento.serialize() for evento in self.eventos_postulados],
            "profile": self.profile.serialize()
        }
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password,  password)
    

        
class Evento(db.Model):
    __tablename__ = 'eventos'
    id= db.Column(db.Integer, primary_key=True)
    organizador= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    nombre_evento = db.Column(db.String, nullable=False)
    ubicacion = db.Column(db.String, nullable=False)
    fecha_hora = db.Column(db.String, nullable=False)
    dinero = db.Column(db.String)
    category=db.Column(db.Enum(category), nullable=False)
    description=db.Column(db.String)
    edad_min = db.Column(db.Integer, nullable=True)
    edad_max = db.Column(db.Integer, nullable=True)
    sexo_permitido = db.Column(db.String, nullable=False)
    genero_permitido = db.Column(db.String, nullable=False)

    
    participantes = relationship('User', secondary=participantes_table, back_populates="eventos_postulados")
    


    
    def serialize(self):
        return {
            "id": self.id,
            "nombre_evento": self.nombre_evento,
            "ubicacion": self.ubicacion,
            "fecha_hora": self.fecha_hora,
            "dinero": self.dinero,
            "organizador": self.organizador_user.nombre if self.organizador_user else None,
            "category": self.category,
            "description": self.description,
            "edad_min": self.edad_min,
            "edad_max": self.edad_max,
            "sexo_permitido": self.sexo_permitido,
            "genero_permitido": self.genero_permitido,
            "participantes": [usuario.nombre for usuario in self.participantes]
    }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
