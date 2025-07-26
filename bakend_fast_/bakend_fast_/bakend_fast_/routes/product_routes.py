from fastapi import APIRouter, Path
from services.product_service import ProductService
from models.product_model import Product

routes_p = APIRouter(prefix="/product", tags=["Product"])

product_service = ProductService()

@routes_p.get("/get-products")
async def get_all_products():
    return await product_service.get_products()

@routes_p.get("/get-product/{product_id}")
async def get_product(product_id: int):
    return await product_service.get_product_by_id(product_id)

@routes_p.post("/create-product")
async def create_product(product: Product):
    return await product_service.create_product(product)


@routes_p.patch("/change-product/{product_id}")
async def change_product(product_id: int = Path(...), product: Product = ...):
    return await product_service.change_product(product, product_id)

@routes_p.delete("/delete-product/{product_id}")
async def delete_product(product_id: int):
    return await product_service.delete_product(product_id)

@routes_p.get("/search")
async def buscar_productos(nombre: str):
    return await ProductService().search_products_by_name(nombre)