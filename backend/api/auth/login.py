from database import db
from models.user import User
from flask import request, session
from flask_restful import Resource
import hashlib


def handle_session(data):
    user = db.session.query(User.name, User.session_id).filter_by(session_id=data['session_id']).first()

    if not user:
        return {"message": "Neteisingas sesijos id arba el.paštas"}

    return {
               'message': "Sėkmingai prisijungta!",
               "name": user.name,
               "email": user.email
           }, 200


def handle_password(data):
    # Prisijungiant regeneruoti sesijos id?

    user = db.session.query(User.name, User.password, User.email, User.session_id).filter_by(
        email=data['email']).first()
    if not user:
        return {"message": "Neteisingas slaptažodis ar el. paštas"}, 409

    if "session_id" in session:
        return {"message": "Jau esate prisijungę"}, 200

    password = user.password
    salt = password[:32]
    key = password[32:]

    new_key = hashlib.pbkdf2_hmac('sha256', data['password'].encode('utf-8'), salt, 100000)

    if new_key != key:
        return {"message": "Neteisingas slaptažodis arba el. paštas"}, 409

    return {
               'message': "Sėkmingai prisijungta!",
               "name": user.name,
               "email": user.email,
               "session_id": user.session_id
           }, 200


class Login(Resource):
    @staticmethod
    def post():
        print(request.cookies)

        data = request.get_json()

        if "session_id" in data:
            return handle_session(data)
        else:
            return handle_password(data)
