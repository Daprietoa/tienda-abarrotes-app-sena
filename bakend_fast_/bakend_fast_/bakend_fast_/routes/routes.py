from fastapi import APIRouter
from services.product_service import ProductService
from models.product_model import Product


routes_p= APIRouter(prefix="/product", tags=["Product"])

product_service= ProductService()
product_model = Product

@routes_p.get("/get-products")
async def get_all_products():
    return await product_service.get_products()

@routes_p.get("/get-product/{product_id}")
async def get_product(product_id: int):
    return await product_service.get_product_by_id(product_id)

@routes_p.post("/create-product")
async def create_product(product:Product):
    return await product_service.create_product(product)

@routes_p.patch("/change-product")
async def change_product(id: int, new_product: str):
    return await product_service.change_product(id,new_product)

@routes_p.delete("/delete-product/{product_id}")
async def delete_product(product_id: int):
    return await product_service.delete_product(product_id)