from flask import Flask
from connection_db import data_base
from config import Config, DevelopmentConfig
from models.user import User
from models.role import Role
from models.user_role import UserRole

def create_app(config_name):
    app = Flask(__name__)

    ##app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost/project_redi'
    if config_name == 'development':
        app.config.from_object(DevelopmentConfig)
    else:
        app.config.from_object(Config)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    data_base.init_app(app)

    with app.app_context():
        data_base.create_all()

    @app.route("/")
    def initial_controller():
        return {
        "message": "Wellcome to my API of project REDI"
        }

    return app;