from flask import Blueprint
from flask_restful import Resource, reqparse, request,Api
from mapper.type_post_mapper import TypePostMapper
from extensions import data_base
from flask_jwt_extended import jwt_required
from configuration.security import admin_required
photo = Blueprint('photo', __name__)
api = Api(photo)

class PhotoController(Resource):
    def __init__(self):
        self.serializer = reqparse.RequestParser(bundle_errors=True)
        self.serializer.add_argument('name', type=str, required=True, location='json', help='Is required the name')
    def post(self):
        if 'file' not in request.files:
            return 'No file part'
        print(request.files)
        file = request.files['file']
        print(file)


    
api.add_resource(PhotoController, '/upload_photo')