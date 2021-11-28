from database import db

class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(80), nullable=False)
    model = db.Column(db.String(80), nullable=False)
    cpu = db.Column(db.String(80), nullable=True)
    gpu = db.Column(db.String(80), nullable=True)
    ram = db.Column(db.String(80), nullable=True)
    storage = db.Column(db.String(80), nullable=True)
    kaina = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<Product {self.brand} {self.model}>'
    def __init__(self, brand, model, cpu, gpu, ram, storage):
        self.brand = brand
        self.model = model
        self.cpu = cpu
        self.gpu = gpu
        self.ram = ram
        self.storage = storage
