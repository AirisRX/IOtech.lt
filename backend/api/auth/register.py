from database import db
from models.user import User
from uuid import uuid4
from flask import request
from flask_restful import Resource
from sqlalchemy import exc
import hashlib
import os
import re

email_regex = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[" \
              "\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](" \
              "?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[" \
              "1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[" \
              "\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]) "


class Register(Resource):
    def post(self):
        data = request.get_json()

        session_id = str(uuid4())
        salt = os.urandom(32)
        key = hashlib.pbkdf2_hmac('sha256', data['password'].encode('utf-8'), salt, 100000)
        password = salt + key

        if not re.search(email_regex, data['email'], re.IGNORECASE):
            return {"message": "Invalid e-mail"}, 422

        try:
            new_user = User(data['name'], data['email'], password, session_id)
            db.session.add(new_user)
            db.session.commit()
        except exc.IntegrityError as e:
            return {"message": "User already exists"}, 409

        return {
                   'message': "Successfully registered!",
                   'name': data['name'],
                   'email': data['email']
               }, 200, {'Set-Cookie': f"session_id={session_id}"}
