from unicodedata import name
from flask import Flask
from flask_cors import CORS
from extensions import data_base, jwt,bcrypt,migrate
from config import Config, DevelopmentConfig
from models.user import User
from models.role import Role
from models.user_role import UserRole
from models.type_post import TypePost
from models.post import Post
from models.photo import Photo
from models.video import Video
from models.post_photo import PostPhoto
from models.post_video import PostVideo
from controller.user_controller import user_controller_bp
from controller.type_post_controller import type_post_bp
from controller.photo_controller import photo_controller_bp
from controller.post_controller import post_controller_bp
import firebase_admin
from firebase_admin import credentials
def create_app(config_name):
    app = Flask(__name__)
    CORS(app=app, origins='*', methods=['GET',
     'POST', 'PUT', 'DELETE'], allow_headers=['Content-Type','Authorization'])
    if config_name == 'development':
        app.config.from_object(DevelopmentConfig)
    else:
        app.config.from_object(Config)

    ruta_credenciales = './dev-proyect-redi-firebase-adminsdk-fu8it-8ae628d9ad.json'
    cred = credentials.Certificate(ruta_credenciales)
    # firebase_admin.initialize_app(cred)
    firebase_admin.initialize_app(cred, {
    'storageBucket': 'dev-proyect-redi.appspot.com'  # Reemplaza con tu URL de Storage
    })
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    data_base.init_app(app)
    migrate.init_app(app, data_base)
    jwt.init_app(app)
    bcrypt.init_app(app)

    app.register_blueprint(user_controller_bp)
    app.register_blueprint(type_post_bp)
    app.register_blueprint(photo_controller_bp)
    app.register_blueprint(post_controller_bp)
    with app.app_context():
        data_base.create_all()

    @app.route("/")
    def initial_controller():
        return {
        "message": "Wellcome to my API of project REDI"
        }
    return app;