import email
from models.user import User
from dtos.user_dto import RegisterRequest

class UserMapper:
    @staticmethod
    def map_from_request(userDto: RegisterRequest):
        return User(
            name=userDto.name,
            email=userDto.email,
            password=userDto.password,
            nationality=userDto.nationality,
            bio=userDto.bio
        )