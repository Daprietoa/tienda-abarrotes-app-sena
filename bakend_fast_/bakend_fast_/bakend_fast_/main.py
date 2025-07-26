from dotenv import load_dotenv
from fastapi.responses import HTMLResponse
import uvicorn
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware

from routes.product_routes import routes_p
from routes.client_routes import router as routes_c  

app = FastAPI()
app.title = "práctica crud"
app.version = "0.0.1"
app.description = "API DESCRIPCION"

# Cargar rutas
app.include_router(routes_p)
app.include_router(routes_c)  

# Carga de variables de entorno
load_dotenv()

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["*"]
)

@app.get(
    path="/",
    status_code=status.HTTP_200_OK,
    summary="DEFAULT_API",
    tags=["APP"]
)
def message():
    """home API"""
    return HTMLResponse("<h1>Ejercicio de pruebas</h1>")
