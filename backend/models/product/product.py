from database import db


class Product(db.Model):
    __tablename__ = "product"

    id = db.Column(db.Integer, primary_key=True)

    cmid = db.Column(db.Integer, db.ForeignKey('component.id'), nullable=False)

    count = db.Column(db.Integer, nullable=False)
    cost = db.Column(db.Integer, nullable=False)
