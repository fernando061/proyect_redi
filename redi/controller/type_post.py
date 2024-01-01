from flask import Blueprint
from flask_restful import Resource, reqparse, request,Api
from mapper.type_post_mapper import TypePostMapper
from extensions import data_base
type_post = Blueprint('auth', __name__)
api = Api(type_post)
class TypePostController(Resource):
    def __init__(self):
        self.serializer = reqparse.RequestParser(bundle_errors=True)
        self.serializer.add_argument('name', type=str, required=True, location='json', help='Is required the name')
        self.serializer.add_argument('description', type=str, required=False, location='json')
    def post(self):
        data = self.serializer.parse_args()
        typePost = TypePostMapper.map_from_request(data)
        data_base.session.add(typePost)
        data_base.session.commit()


        return {
            'success': True,
            'message': 'Type post registered successfully',
        }, 201

api.add_resource(TypePostController, '/type_post')