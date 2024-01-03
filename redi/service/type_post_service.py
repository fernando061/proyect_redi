import imp
from flask import Blueprint
from flask_restful import Resource, reqparse, request,Api
from mapper.type_post_mapper import TypePostMapper
from extensions import data_base
from flask_jwt_extended import jwt_required
from configuration.security import admin_required
from dtos.type_post_dto import TypePostRequest
from models.type_post import TypePost
class TypePostService():
    # def __init__(self):
    #     self.serializer = reqparse.RequestParser(bundle_errors=True)
    #     self.serializer.add_argument('name', type=str, required=True, location='json', help='Is required the name')
    #     self.serializer.add_argument('description', type=str, required=False, location='json')
    
    def save(typePostDto: TypePostRequest):
        existing_typePost = TypePost.query.filter_by(name=typePostDto.name).first()
        if existing_typePost:
            raise ValueError({'error': 'This type is already registered'})
        typePost = TypePostMapper.map_from_request(typePostDto)
        data_base.session.add(typePost)
        data_base.session.commit()