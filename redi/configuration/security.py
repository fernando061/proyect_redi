from flask import current_app, jsonify, abort, make_response,g
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from extensions import data_base,bcrypt
from models.user import User
from models.role import Role
from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from datetime import timedelta

# class User:
#     def __init__(self, id, email):
#         self.id = id
#         self.email = email

#     def __str__(self):
#         return "Usuario con el id='%s' y username = '%s'" % (self.id, self.email)
#         # return "Usuario con el id='{}' y username = '{}'".format(self.id, self.username)


# def autenticador(email, password):
#     '''Funcion encargada en mi JWT de validar las credenciales, valida si son ingresadas correctamente y luego valida si es el usuario'''
#     if email and password:
#         # buscamos el usuario en la base de datos segun el correo
#         user = data_base.session.query(User).filter(
#             User.email == email).first()
#         # si hay un usuario
#         if user:
#             # validamos su password
#             hash = bytes(user.password, 'utf-8')
#             pwdBytes = bytes(password, 'utf-8')
#             if checkpw(pwdBytes, hash) is True:
#                 print('Es el usuario')
#                 return User(user.usuarioId, user.usuarioCorreo)
    # return None

def generate_access_token(identity):
    """Genera un token de acceso."""
    return create_access_token(identity=identity)

def verify_password(user, password):
    """Verifica la contraseña del usuario."""
    return user and bcrypt.check_password_hash(user.password, password)

@jwt_required()
def get_current_user():
    """Obtiene el usuario actual basado en el token JWT."""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return user

def authenticate_user(email, password):
    """Autenticación de usuario."""
    user = User.query.filter_by(email=email).first()
    if not user or not verify_password(user, password):
        return None
    return user
def create_token_response(user, additional_claims=None):
    """Crea una respuesta con el token de acceso."""
    if additional_claims is None:
        additional_claims = {}

# Obtener los roles del usuario
    user_roles = [role.name for role in user.roles]

# Combinar los roles con cualquier reclamación adicional proporcionada
    all_claims = {'roles': user_roles, **additional_claims}
    expires_delta = timedelta(minutes=60)
# Generar el token de acceso con reclamaciones adicionales
    access_token = create_access_token(identity=user.id, additional_claims=all_claims,expires_delta=expires_delta)

# Devolver la respuesta JSON con el token de acceso
    return make_response(jsonify({'access_token': access_token}), 200)



def user_has_admin_role(user):
    admin_role = Role.query.filter_by(name='admin').first()
    return admin_role in user.roles



def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        roles = verify_jwt_in_request()[1].get('roles', [])
        # current_user = get_jwt_identity()
        print(roles[0])
        # Verifica si el usuario tiene el rol de administrador
        # if not current_user.get('is_admin'):
        indice = roles.index('admin') if 'admin' in roles else None
        if indice==None:
            return {
                'success': False,
                'message': 'User is not authorized to perform this action',
            }, 403  # Forbidden
        
        return fn(*args, **kwargs)
    return wrapper

def user_required(fn):
    print("asasasas")
    @wraps(fn)
    def wrapper(*args, **kwargs):
        print("asasasas")
        verify_jwt_in_request()
        print(verify_jwt_in_request())
        roles = verify_jwt_in_request()[1].get('roles', [])
        user_id = verify_jwt_in_request()[1].get('sub', None)
        # current_user = get_jwt_identity()
        print(roles[0])
        indice = roles.index('user') if 'user' in roles else None
        if indice==None:
            return {
                'success': False,
                'message': 'User is not authorized to perform this action',
            }, 403  # Forbidden
        g.user_id = user_id
        return fn(*args, **kwargs)
    return wrapper