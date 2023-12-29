from flask_restful import Resource, reqparse, request
from bcrypt import hashpw, gensalt, checkpw
from re import search
from utils.patterns import PATTERN_EMAIL, PATTERN_PASSWORD
from models.user import User
from models.role import Role
from connection_db import data_base
class RegisterController(Resource):
    serializer = reqparse.RequestParser(bundle_errors=True)
    serializer.add_argument(
        'name',
        type=str,
        location='json',
        required=True,
        help='Is required the name'
    )
    serializer.add_argument(
        'email',
        type=str,
        location='json',
        required=True,
        help='Is required the email'
    )
    serializer.add_argument(
        'password',
        type=str,
        location='json',
        required=True,
        help='Is required the password'
    )
    serializer.add_argument(
        'nationality',
        type=str,
        location='json',
        required=True,
        help='Is required the nationality'
    )
    serializer.add_argument(
        'bio',
        type=str,
        location='json',
        required=True,
        help='Is required the bio'
    )
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
        
        passwordBytes = bytes(password, "utf-8")
        # llamamos al metodo gensalt que nos dara un salt aleatorio en base al numero de rounds
        salt = gensalt(rounds=10)
        # hashpw que lo que hara sera combinar nuestras pwd con el salt generado previamente
        hashPwd = hashpw(passwordBytes, salt)
        # convertimos el hash a formato string para poder almacenarlo en la bd
        hashPwd = hashPwd.decode('utf-8')

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