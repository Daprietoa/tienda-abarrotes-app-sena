from pydantic import BaseModel

# generar modelo de la tabla producto 

class Product(BaseModel):
    nombre_producto: str
    precio_compra: int
    precio_venta: int
    stock: int
    