from database import db


class Category(db.Model):
    __tablename__ = "category"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(100), nullable=True)

    subcategories = db.relationship('Subcategory', backref='category')

    def __repr__(self):
        return f'<Category {self.name} from {self.subkategories}>'

    def __init__(self, name, description):
        self.name = name
        self.description = description
