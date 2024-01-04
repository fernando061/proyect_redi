from models.type_post import TypePost
from models.post import Post
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
        postDto.content = postDto.content
        typePost = TypePost.query.filter_by(name=postDto.type_post).first()
        post.type_post_id = typePost.id
        post.photos.extend(photos)
        data_base.session.add(post)
        data_base.session.commit()