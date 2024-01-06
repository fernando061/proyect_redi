from flask import Blueprint
from flask_restful import Resource, reqparse, request,Api
from configuration.security import admin_required
from service.photo_service import PhotoService
photo_controller_bp = Blueprint('photo', __name__)
api = Api(photo_controller_bp)

from enum import Enum
class EnumTypePost(Enum):
    blog   = "blog"
    post   = "post"
    event  = "event"
    others = "others"


@photo_controller_bp.route('/photo/upload_photo', methods=['POST'])
# @admin_required
def uploadPhoto():
    type_post = request.form.get('type_post')
    if type_post and type_post not in {member.value for member in EnumTypePost}:
        return {
            'status': True,
            'message': 'Este tipo de post no existe. sole se permiten: blog,post,event,others'
        },404
    
    if 'file[]' not in request.files:
        return {
            'status': True,
            'message': 'error'
        },404
    files = request.files.getlist('file[]')
    urls = PhotoService.upload_firebase(files,type_post)
    return {
            'status': True,
            'content': urls,
        }, 201

@photo_controller_bp.route('/photo/get_type_photo', methods=['POST'])
def getTypePost():
    pass
