from extensions import data_base
from sqlalchemy import Column, types,func,orm

# user_roles = Table('user_roles',
#     Column('user_id', types.Integer, ForeignKey('user.id'), primary_key=True),
#     Column('role_id', types.Integer, ForeignKey('role.id'), primary_key=True)
# )

class User(data_base.Model):
    __tablename__ = 'user'
    id = Column(types.Integer, primary_key=True)
    name = Column(types.String(25), nullable=False)
    email = Column(types.String(30), nullable=False, unique=True)
    password = Column(types.String(128), nullable=False)
    nationality = Column(types.String(50), nullable=False)
    bio = Column(types.TEXT)
    created_at = Column(types.DateTime, default=func.current_timestamp())
    updated_at = Column(types.DateTime, default=func.current_timestamp(), onupdate=func.current_timestamp())
    
    # users_roles = orm.relationship(
    #     'UserRole', backref='userRole')
    roles = orm.relationship('Role', secondary='user_role', backref='ref_users')
    posts = data_base.relationship('Post', backref='user_post', lazy='dynamic')