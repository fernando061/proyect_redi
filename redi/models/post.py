from cgitb import text
from extensions import db
from sqlalchemy import Column, types,func,orm
from sqlalchemy.sql.schema import ForeignKey


class Post(db.Model):
    __tablename__ = "post"

    id = Column(types.Integer,primary_key=True)
    user_id = db.Column(types.Integer,ForeignKey('user.id'))
    title = Column(types.String(100),nullable=True)
    event_date = Column(types.DateTime,nullable=True)
    content = Column(types.Text,nullable=True)
    created_at = Column(types.DateTime, default=func.current_timestamp())
    updated_at = Column(types.DateTime, default=func.current_timestamp(), onupdate=func.current_timestamp())
    type_post_id = db.Column(types.Integer,ForeignKey('type_post.id'))
    photos = orm.relationship('Photo', secondary='post_photo', backref='ref_posts')
    videos = orm.relationship('Video', secondary='post_video', backref='ref_post')

