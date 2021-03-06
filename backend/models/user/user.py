from database import db


class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(1024), nullable=False)
    session_id = db.Column(db.String(1024), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def __init__(self, name, email, password, session_id):
        self.name = name
        self.email = email
        self.password = password
        self.session_id = session_id
