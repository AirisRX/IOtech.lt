from database import db


class ComponentSharedInfo(db.Model):
    __tablename__ = "component_shared_info"

    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(20), nullable=True)
    model = db.Column(db.String(20), nullable=False)
