from database import db


class AttributeCategory(db.Model):
    __tablename__ = "attribute_category"

    aid = db.Column(db.Integer, db.ForeignKey('attribute.id'), primary_key=True)
    ctid = db.Column(db.Integer, db.ForeignKey('category.id'), primary_key=True)
