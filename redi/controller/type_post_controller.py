from flask import Blueprint, request, jsonify, render_template
from types import SimpleNamespace
from webargs import fields, validate
from webargs.flaskparser import use_args
from dtos.type_post_dto import TypePostRequest
from service.type_post_service import TypePostService
from configuration.security import admin_required

register_args:TypePostRequest = {
    'name': fields.Str(required=True),
    'description': fields.Str(required=True),
}

type_post_bp = Blueprint('type_post_controller', __name__)
@type_post_bp.route('/type-post/register', methods=['POST'])
@use_args(register_args)
@admin_required
def register(args):
    try:
        typePostDto = SimpleNamespace(**args)
        TypePostService.save(typePostDto)
        return {
            'success': True,
            'message': 'Type post registered successfully',
        }, 201
    except ValueError as e:
        print(e.args)
        error_message = e.args[0] if e.args else "Error desconocido" 
        response = jsonify(error_message)
        response.status_code = 400
        return response

@type_post_bp.errorhandler(422)
def handle_unprocessable_entity(err):
    response = jsonify({'error': err.data.get('messages', ['Invalid request'])})
    response.status_code = 422
    return response