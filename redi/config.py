from os import environ
from dotenv import load_dotenv

load_dotenv()
class Config:
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = environ.get('SQLALCHEMY_DATABASE_URI')
    SECRET_KEY = 'your_secret_key'
    JWT_SECRET_KEY = 'your_jwt_secret_key'

class DevelopmentConfig(Config):
    DEBUG = True





# // Import the functions you need from the SDKs you need
# import { initializeApp } from "firebase/app";
# // TODO: Add SDKs for Firebase products that you want to use
# // https://firebase.google.com/docs/web/setup#available-libraries

# // Your web app's Firebase configuration
# const firebaseConfig = {
#   apiKey: "AIzaSyCsjsH35sGGACOvzM4G98EDugIzA9SSItg",
#   authDomain: "dev-proyect-redi.firebaseapp.com",
#   projectId: "dev-proyect-redi",
#   storageBucket: "dev-proyect-redi.appspot.com",
#   messagingSenderId: "106835234168",
#   appId: "1:106835234168:web:2a9cbe9d8940bfc274cc8d"
# };

# // Initialize Firebase
# const app = initializeApp(firebaseConfig);