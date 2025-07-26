from fastapi.responses import JSONResponse
import pymysql
import pymysql.cursors
from db.bd_mysql import get_db_connection
from models.client_model import Client

class ClientService:
    def __init__(self):
        self.con = get_db_connection()
        if self.con is None:
            print("No se pudo establecer conexión con la base de datos")

    async def get_clients(self):
        """Obtener todos los clientes"""
        try:
            with self.con.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.execute("SELECT * FROM cliente")
                clients = cursor.fetchall()
                return JSONResponse(
                    status_code=200,
                    content={
                        "success": True,
                        "message": "Clientes encontrados correctamente",
                        "data": clients if clients else []
                    }
                )
        except Exception as e:
            return JSONResponse(
                status_code=500,
                content={
                    "success": False,
                    "message": f"Error al obtener clientes: {str(e)}",
                    "data": None
                }
            )

    async def create_client(self, client_data: Client):
        """Crear un nuevo cliente"""
        try:
            self.con.ping(reconnect=True)
            with self.con.cursor() as cursor:
                sql = """
                    INSERT INTO cliente (nombre, telefono, direccion, cedula, estado, deuda)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (
                    client_data.nombre,
                    client_data.telefono,
                    client_data.direccion,
                    client_data.cedula,
                    client_data.estado,
                    client_data.deuda
                ))
                self.con.commit()
                return JSONResponse(
                    status_code=201,
                    content={
                        "success": True,
                        "message": "Cliente creado exitosamente",
                        "data": {"id_cliente": cursor.lastrowid}
                    }
                )
        except Exception as e:
            self.con.rollback()
            return JSONResponse(
                status_code=500,
                content={
                    "success": False,
                    "message": f"Error al crear cliente: {str(e)}",
                    "data": None
                }
            )

    async def delete_client(self, id_cliente: int):
        """Eliminar cliente por ID"""
        try:
            self.con.ping(reconnect=True)
            with self.con.cursor() as cursor:
                sql = "DELETE FROM cliente WHERE id_cliente = %s"
                cursor.execute(sql, (id_cliente,))
                self.con.commit()
                if cursor.rowcount > 0:
                    return JSONResponse(
                        status_code=200,
                        content={
                            "success": True,
                            "message": "Cliente eliminado correctamente",
                            "data": {"id_cliente": id_cliente}
                        }
                    )
                else:
                    return JSONResponse(
                        status_code=404,
                        content={
                            "success": False,
                            "message": "Cliente no encontrado",
                            "data": None
                        }
                    )
        except Exception as e:
            self.con.rollback()
            return JSONResponse(
                status_code=500,
                content={
                    "success": False,
                    "message": f"Error al eliminar cliente: {str(e)}",
                    "data": None
                }
            )
        
    
    async def update_client(self, id_cliente: int, client_data: Client):
        try:
            self.con.ping(reconnect=True)
            with self.con.cursor() as cursor:
                sql = """
                    UPDATE cliente
                    SET nombre=%s, telefono=%s, direccion=%s, cedula=%s, deuda=%s
                    WHERE id_cliente=%s
                """
                cursor.execute(sql, (
                    client_data.nombre,
                    client_data.telefono,
                    client_data.direccion,
                    client_data.cedula,
                    client_data.deuda,
                    id_cliente
                ))
                self.con.commit()
                return JSONResponse(
                    status_code=200,
                    content={
                        "success": True,
                        "message": "Cliente actualizado correctamente",
                        "data": {"id_cliente": id_cliente}
                    }
                )
        except Exception as e:
            self.con.rollback()
            return JSONResponse(
                status_code=500,
                content={"success": False, "message": f"Error: {str(e)}", "data": None}
            )
    async def search_clients_by_name(self, nombre: str):
        try:
            self.con.ping(reconnect=True)
            with self.con.cursor(pymysql.cursors.DictCursor) as cursor:
                sql = "SELECT * FROM cliente WHERE nombre LIKE %s"
                cursor.execute(sql, (f"%{nombre}%",))
                clients = cursor.fetchall()
                return JSONResponse(
                    status_code=200,
                    content={
                        "success": True,
                        "message": "Clientes encontrados",
                        "data": clients
                    }
                )
        except Exception as e:
            return JSONResponse(
                status_code=500,
                content={
                    "success": False,
                    "message": f"Error al buscar clientes: {str(e)}",
                    "data": None
                }
        )
