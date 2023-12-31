from flask import Flask
from extensions import data_base, jwt,bcrypt
from config import Config, DevelopmentConfig
from models.user import User
from models.role import Role
from models.user_role import UserRole
from controller.user import auth_bp

def create_app(config_name):
    app = Flask(__name__)
    # api = Api(app)
    ##app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost/project_redi'
    if config_name == 'development':
        app.config.from_object(DevelopmentConfig)
    else:
        app.config.from_object(Config)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    data_base.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    app.register_blueprint(auth_bp)

    with app.app_context():
        data_base.create_all()

    @app.route("/")
    def initial_controller():
        return {
        "message": "Wellcome to my API of project REDI"
        }
    # api.add_resource(RegisterController, '/register')
    return app;