from database import db


class AttributeCategory(db.Model):
    __table_name__ = "attribute_category"

    ctid = db.Column(db.Integer, db.ForeignKey('category.id'), primary_key=True)
    atid = db.Column(db.Integer, db.ForeignKey('attribute_type.id'), primary_key=True)