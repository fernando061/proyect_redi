from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

data_base = SQLAlchemy()
jwt = JWTManager()
bcrypt = Bcrypt()