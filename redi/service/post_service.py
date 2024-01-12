from models.type_post import TypePost
from models.post import Post
from models.type_post import TypePost
from service.photo_service import PhotoService 
from dtos.post_dto import PostDto
from extensions import data_base
class PostService:

    def __init__(self):
        pass

    def publish_post(postDto:PostDto, files):
        photos = PhotoService.upload_firebase(files,postDto.type_post)
        print(photos)
        post = Post()
        post.user_id = postDto.user_id
        post.title = postDto.title
        post.event_date = postDto.event_date
        post.content = postDto.content
        typePost = TypePost.query.filter_by(name=postDto.type_post).first()
        post.type_post_id = typePost.id
        post.photos.extend(photos)
        data_base.session.add(post)
        data_base.session.commit()

    def get_type_posts(typePost: str):
        typePost = TypePost.query.filter_by(name=typePost).first()
        posts = Post.query.filter_by(type_post_id=typePost.id).all()
        serialized_posts = [PostService._post_to_dict(post) for post in posts]
        print(serialized_posts)
        return serialized_posts
    def post():
        typePost = TypePost.query.filter_by(name='post').first()
        posts = Post.query.filter_by(type_post_id=typePost.id).all()
        serialized_posts = [PostService._post_to_dict(post) for post in posts]
        return serialized_posts
    def _post_to_dict(post):
        return {
        'id': post.id,
        'title': post.title, # Ajusta esto a los campos que quieras devolver
        'content': post.content,
        'event_date': post.event_date,
        'created_at': post.created_at,
        'photos': [PostService._photo_to_dict(photo) for photo in post.photos]  # Convertir cada foto a un diccionario
        # Puedes agregar más campos si es necesario
    }

    def _photo_to_dict(photo):
        return {
        'id': photo.id,
        'url_file': photo.url_file, # Ajusta esto a los campos que quieras devolver
        'type_file': photo.type_file
    }

    


