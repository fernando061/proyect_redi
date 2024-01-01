from flask import Blueprint
from flask_restful import Resource, reqparse, request,Api
from bcrypt import hashpw, gensalt, checkpw
from re import search
from utils.patterns import PATTERN_EMAIL, PATTERN_PASSWORD
from models.user import User
from models.role import Role
from extensions import data_base, bcrypt
from configuration.security import user_has_admin_role,create_token_response,authenticate_user
auth_bp = Blueprint('auth', __name__)
api = Api(auth_bp)
class RegisterController(Resource):
    def __init__(self):
        self.serializer = reqparse.RequestParser(bundle_errors=True)
        self.serializer.add_argument('name', type=str, location='json', required=True, help='Is required the name')
        self.serializer.add_argument('email', type=str, location='json', required=True, help='Is required the email')
        self.serializer.add_argument('password', type=str, location='json', required=True, help='Is required the password')
        self.serializer.add_argument('nationality', type=str, location='json', required=True, help='Is required the nationality')
        self.serializer.add_argument('bio', type=str, location='json', required=True, help='Is required the bio')

    def post(self):
        data = self.serializer.parse_args()
        print(data)

        email = data['email']
        if search(PATTERN_EMAIL, email) is None:
            return {
                "message":"Email incorrect"
            }, 400
        password = data['password']
        if search(PATTERN_PASSWORD, password) is None:
            return {
                "message": "Password incorrecto, minimo 6 caracteres una mayuscula, una minuscula y un simbolo especial"
            }, 400
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return {'error': 'This email is already registered'}, 400
        
        # passwordBytes = bytes(password, "utf-8")
        # llamamos al metodo gensalt que nos dara un salt aleatorio en base al numero de rounds
        # salt = gensalt(rounds=10)
        # hashpw que lo que hara sera combinar nuestras pwd con el salt generado previamente
        # hashPwd = hashpw(passwordBytes, salt)
        # convertimos el hash a formato string para poder almacenarlo en la bd
        # hashPwd = hashPwd.decode('utf-8')
        hashPwd = bcrypt.generate_password_hash(password).decode('utf-8')
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')
        nationality = data.get('nationality')
        bio = data.get('bio')
        is_admin = data.get('admin', False)
        default_role = Role.query.filter_by(name='user').first()

        new_user = User(
            email=email,
            password=hashPwd,
            name=name,
            nationality=nationality,
            bio=bio,
            roles=[default_role]  # Asignar el rol por defecto al nuevo usuario
        )
        if is_admin:
            admin_role = Role.query.filter_by(name='admin').first()
            if admin_role:
                new_user.roles.append(admin_role)

        
        data_base.session.add(new_user)
        data_base.session.commit()

        #token_response = create_token_response(new_user)

        # Retornar un diccionario que puede ser serializado a JSON
        return {
            'success': True,
            'message': 'User registered successfully',
           ## 'token': token_response.get_json()['access_token']
        }, 200
class LoginController(Resource):
    def __init__(self):
        self.serializer = reqparse.RequestParser(bundle_errors=True)
        self.serializer.add_argument('email', type=str, required=True, location='json', help='Is required the email')
        self.serializer.add_argument('password', type=str, required=True, location='json', help='Is required the password')
    def post(self):
        data = self.serializer.parse_args()
        print(data)
        email =  data['email']
        password =  data['password']
        user = data_base.session.query(User).filter(
        User.email == email).first()
        print('############')
        print(password)
        if user is None:
            return {
                "message": "User not found"
            }, 404
        # seq = User()
        user = authenticate_user(email, password)
        # print(user.email)
        if not user:
            return {'error': 'Invalid email or password'}, 401
        if user_has_admin_role(user):
            admin_dashboard_url = '/admin/dashboard'
            return {'success': True, 'message': 'Login successful', 'data': {'admin_dashboard_url': admin_dashboard_url}}, 200
        
        token_response = create_token_response(user).get_json()
        return {'success': True, 'message': 'Login successful', 'data': {'token': token_response['access_token']}}, 200

api.add_resource(RegisterController, '/register')
api.add_resource(LoginController, '/login')