from bcrypt import hashpw, gensalt, checkpw
from re import search
from dtos.user_dto import RegisterRequest,LoginRequest
from utils.patterns import PATTERN_EMAIL, PATTERN_PASSWORD
from models.user import User
from models.role import Role
from extensions import data_base, bcrypt
from configuration.security import user_has_admin_role,create_token_response,authenticate_user
from mapper.user_mapper import UserMapper
class UserService():
    def __init__(self):
        pass

    def register(userDto: RegisterRequest):
        print("####")
        print(userDto)
        email = userDto.email
        if search(PATTERN_EMAIL, email) is None:
            raise ValueError({
                "message":"Email incorrect"
            })
        password = userDto.password
        if search(PATTERN_PASSWORD, password) is None:
            raise ValueError({
                "message": "Password incorrecto, minimo 6 caracteres una mayuscula, una minuscula y un simbolo especial"
            })
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            raise ValueError({'error': 'This email is already registered'})
        
        hashPwd = bcrypt.generate_password_hash(password).decode('utf-8')
        userDto.password = hashPwd
        user = UserMapper.map_from_request(userDto)
        role_user = Role.query.filter_by(name='user').first()
        user.roles.append(role_user)
        data_base.session.add(user)
        data_base.session.commit()
    
    def login(loginDto: LoginRequest):
        email =  loginDto.email
        password =  loginDto.password
        user = data_base.session.query(User).filter(
        User.email == email).first()
        if user is None:
            raise ValueError({
                "message": "User not found"
            })
        user = authenticate_user(email, password)
        if not user:
           raise ValueError({'error': 'Invalid email or password','status_code': 401})
        # if user_has_admin_role(user):
        #     admin_dashboard_url = '/admin/dashboard'
        #     return {'success': True, 'message': 'Login successful', 'data': {'admin_dashboard_url': admin_dashboard_url}}, 200
        
        token_response = create_token_response(user).get_json()
        return token_response['access_token']
        
 
