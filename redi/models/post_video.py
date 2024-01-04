from extensions import data_base
from sqlalchemy import Column,types
from sqlalchemy.sql.schema import ForeignKey

class PostVideo(data_base.Model):
    __tablename__ = "post_video"

    id = Column(types.Integer, primary_key=True)
    
    post_id = Column(ForeignKey(column='post.id'),
                    name='post_id', nullable=False, type_=types.Integer,primary_key=True)

    video_id = Column(ForeignKey(column='video.id'),
                         name='video_id', nullable=False, type_=types.Integer,primary_key=True)