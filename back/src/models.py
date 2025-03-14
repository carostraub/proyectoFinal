import os
import sys
import enum
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, backref
from sqlalchemy import ForeignKey, Column, Integer, String, Table, Enum, Date, Time
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Estatus(enum.Enum):
    PARTICIPANTE = 1
    RECHAZADO = 2
    POSTULANTE = 3




participantes_table = db.Table(
    'participantes',
    db.Column('id_usuario', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('id_evento', db.Integer, db.ForeignKey('eventos.id'), primary_key=True),
    db.Column('estatus', db.Enum(Estatus), nullable=False)
)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    usuario = db.Column(db.String, nullable=False)
    nombre = db.Column(db.String, nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    sexo = db.Column(db.String, nullable=False)
    genero = db.Column(db.String, nullable=False)
    biography = db.Column(db.String, default="")
    profilePicture = db.Column(db.String, default=None, nullable=False)
    
    eventos_creados = relationship('Evento', back_populates="organizador_user", cascade="all, delete-orphan", lazy=True)
    eventos_postulados = relationship('Evento', secondary=participantes_table, back_populates="participantes", lazy=True)
    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "usuario": self.usuario,
            "nombre": self.nombre,
            "edad": self.edad,
            "sexo": self.sexo,
            "genero": self.genero,
            "biography": self.biography,
            "profilePicture": self.profilePicture,
            
        }

    def serialize_basic(self):
        """ evitar problemas en relaciones """
        return {
            "id": self.id,
            "nombre": self.nombre
        }
    
    def serialize_complete(self):
        return {
            "id": self.id,
            "email": self.email,
            "usuario": self.usuario,
            "nombre": self.nombre,
            "edad": self.edad,
            "sexo": self.sexo,
            "genero": self.genero,
            "biography": self.biography,
            "profile": self.profilePicture,
            "eventos_creados": [evento.serialize() for evento in self.eventos_creados],
            "eventos_postulados": [evento.serialize() for evento in self.eventos_postulados]
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
        return check_password_hash(self.password, password)

class Evento(db.Model):
    __tablename__ = 'eventos'
    id = db.Column(db.Integer, primary_key=True)
    organizador_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    nombre_evento = db.Column(db.String, nullable=False)
    ubicacion = db.Column(db.String, nullable=False)
    final_ubication=db.Column(db.String)
    fecha = db.Column(Date, nullable=False)
    hora = db.Column(Time, nullable=False)
    dinero = db.Column(db.String)
    category = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    description = db.Column(db.String)
    edad_min = db.Column(db.Integer, nullable=True)
    edad_max = db.Column(db.Integer, nullable=True)
    sexo_permitido = db.Column(db.String, nullable=False)
    genero_permitido = db.Column(db.String, nullable=False)

    organizador_user = relationship('User', back_populates="eventos_creados")
    participantes = relationship('User', secondary=participantes_table, back_populates="eventos_postulados")
    categoria = relationship('Category', back_populates='eventos')

    def serialize(self):
        return {
            "id": self.id,
            "nombre_evento": self.nombre_evento,
            "ubicacion": self.ubicacion,
            "fecha": self.fecha,
            "hora": self.hora,
            "dinero": self.dinero,
            "organizador": self.organizador_user.serialize_basic() if self.organizador_user else None,
            "category": self.categoria.titulo if self.categoria else None,
            "description": self.description,
            "edad_min": self.edad_min,
            "edad_max": self.edad_max,
            "sexo_permitido": self.sexo_permitido,
            "genero_permitido": self.genero_permitido,
            "participantes": [usuario.serialize_basic() for usuario in self.participantes]
        }
    
    def serialize_security(self):
        return {
            "id": self.id,
            "nombre_evento": self.nombre_evento,
            "ubicacion": self.ubicacion,
            "fecha": self.fecha,
            "hora": self.hora,
            "final_ubication": self.final_ubication,
            "organizador": self.organizador_user.serialize_basic() if self.organizador_user else None,
            "category": self.categoria.titulo if self.categoria else None,
            "description": self.description,
            "edad_min": self.edad_min,
            "edad_max": self.edad_max,
            "sexo_permitido": self.sexo_permitido,
            "genero_permitido": self.genero_permitido,
            "participantes": [usuario.serialize_basic() for usuario in self.participantes]
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    categoria =db.Column(db.String, nullable=False)
    titulo= db.Column(db.String, nullable=False)
    description1= db.Column(db.String)
    description2= db.Column(db.String)
    

    eventos = relationship('Evento', back_populates='categoria')


    def serialize(self):
        return {
            "id": self.id,
            "categoria": self.categoria,
            "titulo":self.titulo,
            "description1": self.description1,
            "description2": self.description2,
           
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()



