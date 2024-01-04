from extensions import data_base
from sqlalchemy import Column,types
from sqlalchemy.sql.schema import ForeignKey

class PostPhoto(data_base.Model):
    __tablename__ = "post_photo"

    id = Column(types.Integer, primary_key=True, autoincrement=True)
    
    post_id = Column(ForeignKey(column='post.id'),
                    name='post_id', nullable=False, type_=types.Integer,)

    photo_id = Column(ForeignKey(column='photo.id'),
                         name='photo_id', nullable=False, type_=types.Integer)