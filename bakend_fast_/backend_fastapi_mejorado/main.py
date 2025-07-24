from dotenv import load_dotenv
from fastapi import FastAPI, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from routes.routes import router

app = FastAPI(
    title="Práctica CRUD",
    version="0.0.1",
    description="API para Tienda de Abarrotes"
)

# Cargar variables de entorno
load_dotenv()

# Configuración CORS (ajustar dominios en producción)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambiar en producción por ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Manejo global de errores de validación
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors(), "body": exc.body},
    )

# Rutas
app.include_router(router)

# Servidor para desarrollo local
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
