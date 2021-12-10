from database import db


class ProductExtraSelection(db.Model):
    __tablename__ = "product_extra_selection"

    pid1 = db.Column(db.Integer, db.ForeignKey('product.id'), primary_key=True)
    pid2 = db.Column(db.Integer, db.ForeignKey('product.id'), primary_key=True)
