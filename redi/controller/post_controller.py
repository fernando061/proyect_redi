from flask import Blueprint,jsonify,g
from flask_restful import Resource, reqparse, request,Api
from webargs.flaskparser import use_args
from dataclasses import field
from types import SimpleNamespace
from webargs import fields, validate
from configuration.security import admin_required,user_required
from service.post_service import PostService
from enum import Enum

from dtos.post_dto import PostDto



publish_post_args = {
    'content': fields.Str(required=True),
    'type_post': fields.Str(required=True),
    'photo': fields.List(fields.Int(),required=False),
    'video': fields.List(fields.Int(),required=False),
}
post_controller_bp = Blueprint('post_controller', __name__)
@post_controller_bp.route('/post/publish_post', methods=['POST'])
# @admin_required
def publishPost():
    try:
        print("#####################################################################")
        print(request.form.get('content'))
        user_id = getattr(g, 'user_id', None)
        postDto = PostDto(request.form.get('title'),request.form.get('event_date'),request.form.get('content'),request.form.get('type_post'),user_id)
        print(postDto.user_id)
        files = request.files.getlist('file[]')
        print(request.form.getlist('file[]'))
        if 'file[]' not in request.files:
            return {
                'status': False,
                'message': 'The file[] is required'
            },404
        PostService.publish_post(postDto,files)
        return {
                'status': True,
                'content':'Post registered!',
            }, 201
    except ValueError as e:
        print(e)
        return {
            'status':False,
            'message': str(e)
        },404

@post_controller_bp.route('/post/get_type_photo/<type_post>', methods=['GET'])
def getTypePost(type_post: str):
    posts = PostService.get_type_posts(type_post)
    return {
                'status': True,
                'content':posts,
            }, 200
@post_controller_bp.route('/post', methods=['GET'])
def getPost():
    posts = PostService.post()
    return {
                'status': True,
                'content':posts,
            }, 200
@post_controller_bp.errorhandler(422)
def handle_unprocessable_entity(err):
    response = jsonify({'error': err.data.get('messages', ['Invalid request'])})
    response.status_code = 422
    return response