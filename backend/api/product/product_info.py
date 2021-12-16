from flask import request
from flask_restful import Resource

from models.category import Category
from models.product import Product
from models.component import Component as Comp, ComponentSharedInfo as CompSI
from models.brand import Brand
from models.component.component_images import ComponentImages as CompIMG
from models.attribute import AttributeValue
from models.attribute import AttributeType
from models.component import ComponentAttribute, SubComponent

from database import db


def get_attributes(attrs):
    res_attrs = {}
    for attr in attrs:
        res_attr = {attr.name: attr.value}
        parent_id = attr.parent_id
        while parent_id:
            q = db.session.query(AttributeType.id, AttributeType.parent_id, AttributeType.name).select_from(
                AttributeType).filter(AttributeType.id == parent_id)
            iattr = q.first()

            parent_id = iattr.parent_id

            res_attr = {iattr.name: res_attr}

        # res = results["attrs"][list(res_attr.keys())[0]]

        iattr = res_attr
        key1 = list(iattr.keys())[0]

        key2 = res_attrs
        while key1 in key2:
            key2 = key2[key1]

            iattr = iattr[key1]
            key1 = list(iattr.keys())[0]

        else:
            key2.update(iattr)
    return res_attrs


def get_component_attrs(comp_id):
    q = db.session.query(Brand.name.label("brand"), CompSI.model, AttributeType.id.label("atid"), AttributeType.name.label("type")).select_from(Comp).filter(Comp.id == comp_id)
    q = q.join(CompSI, CompSI.id == Comp.csid)
    q = q.join(Brand, Brand.id == CompSI.bid, isouter=True)
    q = q.join(AttributeType, AttributeType.id == CompSI.atid)

    comp = q.first()

    results = {"component_id": comp_id, "model": comp.model}
    if comp.brand:
        results["brand"] = comp.brand

    q = db.session.query(AttributeType.parent_id, AttributeType.name, AttributeValue.value).select_from(Comp).filter(Comp.id == comp_id)

    q = q.join(ComponentAttribute, ComponentAttribute.cmid == Comp.id)

    q = q.join(AttributeValue, AttributeValue.id == ComponentAttribute.avid)
    q = q.join(AttributeType, AttributeType.id == AttributeValue.atid)

    attrs = q.all()

    if attrs:
        results["attrs"] = get_attributes(attrs)

    q = db.session.query(SubComponent.cmid2.label("id")).select_from(Comp).filter(Comp.id == comp_id)
    q = q.join(SubComponent, SubComponent.cmid1 == Comp.id)

    subs = q.all()

    if subs and "attrs" not in results:
        results["attrs"] = {}

    for sub in subs:
        _, atype, results["attrs"][atype] = get_component_attrs(sub.id)

    return comp.atid, comp.type, results


class ProductInfoAPI(Resource):
    def get(self):
        pid = request.args.get('pid')
        q = db.session.query(Product.id.label("product_id"), Comp.id.label("comp_id"), Product.cost, Product.count, CompIMG.url.label("img")).select_from(Product).filter(Product.id == pid)
        q = q.join(Comp, Comp.id == Product.cmid)
        q = q.join(CompIMG, CompIMG.id == Comp.thumbnail_id, isouter=True)

        prod = q.first()

        atid, atype, results = get_component_attrs(prod.comp_id)

        q = db.session.query(Category.name).filter(Category.atid == atid)
        res = q.first()

        results["product_id"] = prod.product_id
        results["cost"] = prod.cost
        results["count"] = prod.count
        results["category"] = res.name
        if prod.img:
            results["img"] = prod.img

        print(results)

        return results

