from extensions import db
from sqlalchemy import Column, types,func,orm


class Video(db.Model):
    __tablename__ = 'video'

    id = Column(types.Integer, primary_key=True)
    type_file = Column(types.String(25),nullable=False)
    url_file = Column( types.String(255),nullable=False)
    post = orm.relationship('Post', secondary='post_video', backref='ref_video')