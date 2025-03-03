import os
import sys
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import create_engine, String, ForeignKey, Date, Column, Integer
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()