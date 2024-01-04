from extensions import data_base
from sqlalchemy import Column,types
from sqlalchemy.sql.schema import ForeignKey

class UserRole(data_base.Model):
    __tablename__ = "user_role"

    user_id = Column(ForeignKey(column='user.id'),
                    name='user_id', nullable=False, type_=types.Integer,primary_key=True)

    role_id = Column(ForeignKey(column='role.id'),
                         name='role_id', nullable=False, type_=types.Integer,primary_key=True)