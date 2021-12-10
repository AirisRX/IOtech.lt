from database import db


class Order(db.Model):
    __tablename__ = "order"

    uid = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    pid = db.Column(db.Integer, db.ForeignKey('product.id'), primary_key=True)

    ordered_when = db.Column(db.DateTime, nullable=False)
