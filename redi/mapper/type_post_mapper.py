from models.type_post import TypePost

class TypePostMapper:
    @staticmethod
    def map_from_request(request_data):
        return TypePost(
            name=request_data['name'],
            description=request_data['description']
        )