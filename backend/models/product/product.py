from database import db


class Product(db.Model):
    __tablename__ = "product"

    cid = db.Column(db.Integer, db.ForeignKey('component.id'), primary_key=True)

    count = db.Column(db.Integer, nullable=False)
    cost = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(100), nullable=True)
