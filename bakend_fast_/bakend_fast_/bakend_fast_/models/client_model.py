from pydantic import BaseModel

class Client(BaseModel):
    nombre: str
    telefono: str
    direccion: str
    cedula: str
    deuda: int
    estado: str = "activo"  # Asumimos que es por defecto
