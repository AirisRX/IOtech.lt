from flask_restful import Resource
from flask import request
from models.category import Category
from models.attribute import AttributeType
from models.product import Product
from models.component import Component as Comp, ComponentSharedInfo as CompSI
from models.brand import Brand
from models.component.component_images import ComponentImages as CompIMG

from database import db


class ProductsAPI(Resource):
    def get(self):
        slug = request.args.get('slug')
        name = request.args.get('name')

        q = db.session.query(Comp.id, Brand.name.label("brand"), CompSI.model, Product.cost,
                             Product.count, CompIMG.url.label("img")).select_from(Category)
        if slug:
            q = q.filter(Category.slug == slug)
        q = q.join(CompSI, Category.atid == CompSI.atid)
        q = q.join(Comp, Comp.csid == CompSI.id)
        q = q.join(Product, Product.cmid == Comp.id)
        q = q.join(Brand, Brand.id == CompSI.bid, isouter=True)
        if name:
            q = q.filter((Brand.name + db.literal(" ") + CompSI.model).contains(name))
        q = q.join(CompIMG, CompIMG.id == Comp.thumbnail_id, isouter=True)

        res = q.all()

        results = []

        for r in res:
            product = {
                "model": r.model,
                "cost": r.cost,
                "count": r.count
            }
            if r.brand:
                product["brand"] = r.brand
            if r.img:
                product["img"] = "http://localhost:5000/img/" + r.img

            results.append(product)

        return results
