from models.type_post import TypePost
from dtos.type_post_dto import TypePostRequest

class TypePostMapper:
    @staticmethod
    def map_from_request(typePostDto: TypePostRequest):
        return TypePost(
            name=typePostDto.name,
            description=typePostDto.description
        )