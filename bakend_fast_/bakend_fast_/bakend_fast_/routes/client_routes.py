from fastapi import APIRouter, HTTPException
from services.client_services import ClientService
from models.client_model import Client

router = APIRouter(prefix="/client", tags=["Clientes"])
client_service = ClientService()

@router.get("/get-clients")
async def get_clients():
    return await client_service.get_clients()

@router.post("/create-client")
async def create_client(client_data: Client):
    return await client_service.create_client(client_data)

@router.delete("/delete-client/{client_id}")
async def delete_client(client_id: int):
    return await client_service.delete_client(client_id)

@router.patch("/update-client/{client_id}")
async def update_client(client_id: int, client_data: Client):
    return await client_service.update_client(client_id, client_data)

@router.get("/search")
async def search_clients(nombre: str):
    return await client_service.search_clients_by_name(nombre)
