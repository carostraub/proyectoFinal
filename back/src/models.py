import os
import sys
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import create_engine, String, ForeignKey, Date, Column, Integer
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

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
    profilePicture = db.Column(db.String, default="uploads/default.png", nullable=False)
    
    
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
    
    
class Participante(db.Model):
    __tablename__ = 'participantes'
    
    id_evento= db.Column(db.Integer, primary_key=True)
    id_usuario= db.Column(db.Integer, primary_key=True)
    estatus = db.Column(db.Integer, nullable=False)
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
        
class Evento(db.Model):
    __tablename__ = 'eventos'
    id= db.Column(db.Integer, primary_key=True)
    organizador= db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    nombre_evento = db.Column(db.String, nullable=False)
    ubicacion = db.Column(db.String, nullable=False)
    fecha_hora = db.Column(db.String, nullable=False)
    dinero = db.Column(db.String)
    
    def serialize(self):
        return {
            "nombre_evento": self.nombre_evento,
            "ubicacion": self.ubicacion,
            "fecha_hora": self.fecha_hora,
            "dinero": self.dinero
        }
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
