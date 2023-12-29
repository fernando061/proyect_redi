from connection_db import data_base
from sqlalchemy import Column,types
from sqlalchemy.sql.schema import ForeignKey
# user_roles = Table('user_roles',
#     Column('user_id', types.Integer, ForeignKey('user.id'), primary_key=True),
#     Column('role_id', types.Integer, ForeignKey('role.id'), primary_key=True)
# )

class UserRole(data_base.Model):
    __tablename__ = "user_role"

    user = Column(ForeignKey(column='user.id'),
                    name='user_id', nullable=False, type_=types.Integer,primary_key=True)

    role = Column(ForeignKey(column='role.id'),
                         name='role_id', nullable=False, type_=types.Integer,primary_key=True)