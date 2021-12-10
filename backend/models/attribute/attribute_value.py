from database import db


class AttributeValue(db.Model):
    __table_name__ = "attribute_value"

    atid = db.Column(db.Integer, db.ForeignKey('attribute_type.id'), primary_key=True)
    value = db.Column(db.String(20), nullable=True, primary_key=True)

    # __table_args__ = (db.UniqueConstraint(atid, value, name='_type_value_uc'),)
