from database import db
from models import User
from flask import request
from flask_restful import Resource
import hashlib

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = db.session.query(User.name, User.password, User.email, User.session).filter_by(email=data['email']).first()
        if not user:
            return {"message": "Wrong password or email"}, 409
        
        password = user[1]
        salt = password[:32]
        key = password[32:]

        new_key = hashlib.pbkdf2_hmac('sha256', data['password'].encode('utf-8'), salt, 100000)

        if new_key != key:
            return {"message": "Wrong password or email"}, 409

        session_id = user[3]
        
        return {
            'message': "Successfully logged in!",
            "name": user[0],
            "email": user[2] 
        }, 200, {'Set-Cookie': f"session_id={session_id}"}
