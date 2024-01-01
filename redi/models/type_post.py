from extensions import data_base
from sqlalchemy import Column,types
class TypePost(data_base.Model):
    __tablename__ = "type_post"

    id = Column(types.Integer,primary_key=True)
    name = Column(types.String(25),nullable=False)
    description = Column(types.String(100),nullable=True)
    posts = data_base.relationship('Post', backref='ref_type_post', lazy='dynamic')

    def __repr__(self):
        return f"<TypePost(id={self.id}, name='{self.name}', description='{self.description}')>"
    