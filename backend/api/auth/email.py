from database import db
from models.user import User
from flask import request
from flask_restful import Resource


class Email(Resource):
    def post(self):
        data = request.get_json()
        print(data['email'])
        user = db.session.query(User.name).filter_by(email=data['email']).first()
        print(user)
        if not user:
            return {'exists': False, 'message': 'E-mail is good to go!'}
        else:
            return {'exists': True, 'message': 'User by that E-mail is registered'}, 409
