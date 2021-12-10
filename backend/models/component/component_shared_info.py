from database import db


class ComponentSharedInfo(db.Model):
    __tablename__ = "component_shared_info"

    id = db.Column(db.Integer, primary_key=True)
    bid = db.Column(db.String(20), db.ForeignKey('brand.id'), nullable=True)
    atid = db.Column(db.Integer, db.ForeignKey('attribute_type.id'), nullable=True)
    model = db.Column(db.String(20), nullable=False)

    __table_args__ = (db.UniqueConstraint(bid, model, name='_brand_model_uc'),)
