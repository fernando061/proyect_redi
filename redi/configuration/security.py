from flask import current_app, jsonify, abort, make_response
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from extensions import data_base,bcrypt
from models.user import User
from models.role import Role

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

# Generar el token de acceso con reclamaciones adicionales
    access_token = create_access_token(identity=user.id, additional_claims=all_claims)

# Devolver la respuesta JSON con el token de acceso
    return make_response(jsonify({'access_token': access_token}), 200)



def user_has_admin_role(user):
    admin_role = Role.query.filter_by(name='admin').first()
    return admin_role in user.roles




# def identificador(payload):
#     '''Sirve para que una vez el usuario envie la token y quiera realizar una peticion a una ruta protegida esta funcion sera encargada de identificar a dicho usuario y devolver su informacion'''
#     print(payload)
#     usuarioId = payload.get('usuario').get('id')
#     print(usuarioId)
#     usuarioEncontrado = base_de_datos.session.query(
#         UsuarioModel).filter(UsuarioModel.usuarioId == usuarioId).first()
#     if usuarioEncontrado:
#         return usuarioEncontrado.__dict__
#     return None
