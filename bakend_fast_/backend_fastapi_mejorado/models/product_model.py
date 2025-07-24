from pydantic import BaseModel

class Product(BaseModel):
    id: int
    nombre: str
    precio_compra: float
    precio_venta: float

    class Config:
        schema_extra = {
            "example": {
                "id": 1,
                "nombre": "Arroz Diana",
                "precio_compra": 1800.0,
                "precio_venta": 2500.0
            }
        }

class ProductIn(BaseModel):
    nombre: str
    precio_compra: float
    precio_venta: float

    class Config:
        schema_extra = {
            "example": {
                "nombre": "Arroz Diana",
                "precio_compra": 1800.0,
                "precio_venta": 2500.0
            }
        }
