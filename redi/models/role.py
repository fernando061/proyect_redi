from extensions import db
from sqlalchemy import Column,String,Integer,orm

class Role(db.Model):
    __tablename__ = 'role'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)
    # users_roles = orm.relationship(
    #     'UserRole', backref='userRole')
    users = orm.relationship('User', secondary='user_role', backref='ref_roles')