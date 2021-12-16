from database import db


class AttributeValue(db.Model):
    __table_name__ = "attribute_value"

    id = db.Column(db.Integer, primary_key=True)
    atid = db.Column(db.Integer, db.ForeignKey('attribute_type.id'), nullable=False)
    value = db.Column(db.String(20), nullable=True)

    __table_args__ = (db.UniqueConstraint(atid, value, name='_atid_value_uc'),)
