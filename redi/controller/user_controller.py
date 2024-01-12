from types import SimpleNamespace
from flask import Blueprint, request, jsonify, render_template
from dtos.user_dto import RegisterRequest,LoginRequest
from service.user_service import UserService
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from webargs import fields, validate
from webargs.flaskparser import use_args
from marshmallow import ValidationError
from models.user import User
user_controller_bp = Blueprint('user_controller', __name__)

register_args:RegisterRequest = {
    'name': fields.Str(required=True, validate=validate.Length(min=1)),
    'email': fields.Str(required=True),
    'password': fields.Str(required=True),
    'nationality': fields.Str(required=True),
    'bio': fields.Str(required=True)
}
login_args:LoginRequest = {
    'email': fields.Email(required=True),
    'password': fields.Str(required=True),
}

@user_controller_bp.route('/register', methods=['POST'])
@use_args(register_args)
def register(args):
    try:
        userDto = SimpleNamespace(**args)
        print(args)
        UserService.register(userDto)
        return {
            'success': True,
            'message': 'User registered successfully',
        }, 201
    except ValueError as e:
        # Captura el diccionario devuelto en la excepción
        print(e.args)
        error_message = e.args[0] if e.args else "Error desconocido" 
        response = jsonify(error_message)
        response.status_code = 400
        return response

@user_controller_bp.route('/login', methods=['POST'])
@use_args(login_args)
def login(args):
    try:
        loginDto = SimpleNamespace(**args)
        token = UserService.login(loginDto)
        user = User.query.filter_by(email=loginDto.email).first()
        return {'success': True, 'message': 'Login successful', 'data': {'token': token,
                                                                         'name':user.name,
                                                                         'email':user.email}}, 200
    except ValueError as e:
        error_data = e.args[0] if e.args else "Error desconocido" 
        error_message = error_data.get('error', 'Unknown error')
        status_code = error_data.get('status_code', 400)  # Si no hay código de estado, usa 500 (Error interno del servidor)

        # Convierte el diccionario a formato JSON usando jsonify de Flask
        response = jsonify({"error": error_message})

        # Establece el código de estado HTTP adecuado
        response.status_code = status_code

        # Devuelve la respuesta al cliente
        return response

@user_controller_bp.errorhandler(422)
def handle_unprocessable_entity(err):
    response = jsonify({'error': err.data.get('messages', ['Invalid request'])})
    response.status_code = 422
    return response