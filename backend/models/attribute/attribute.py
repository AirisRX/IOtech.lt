from database import db


class Attribute(db.Model):
    __tablename__ = "attribute"

    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey(id), nullable=True)
    name = db.Column(db.String(20))
    description = db.Column(db.String(100), nullable=True)

    __table_args__ = (db.UniqueConstraint(parent_id, name, name='_parent_name_uc'),)
