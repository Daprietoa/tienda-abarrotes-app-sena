from fastapi import APIRouter, HTTPException
from typing import List
from models.product_model import Product, ProductIn
from services.product_service import get_all_products, create_product, update_product, delete_product

router = APIRouter()

@router.get("/productos", response_model=List[Product], summary="Listar todos los productos")
def listar_productos():
    productos = get_all_products()
    return productos

@router.post("/productos", response_model=dict, status_code=201, summary="Crear un nuevo producto")
def crear_producto(producto: ProductIn):
    result = create_product(producto)
    if result:
        return {"mensaje": "Producto creado exitosamente"}
    raise HTTPException(status_code=400, detail="Error al crear producto")

@router.put("/productos/{id}", response_model=dict, summary="Actualizar un producto")
def actualizar_producto(id: int, producto: ProductIn):
    result = update_product(id, producto)
    if result:
        return {"mensaje": "Producto actualizado exitosamente"}
    raise HTTPException(status_code=404, detail="Producto no encontrado")

@router.delete("/productos/{id}", response_model=dict, summary="Eliminar un producto")
def eliminar_producto(id: int):
    result = delete_product(id)
    if result:
        return {"mensaje": "Producto eliminado exitosamente"}
    raise HTTPException(status_code=404, detail="Producto no encontrado")
