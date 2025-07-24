from fastapi.responses import JSONResponse
import pymysql
import pymysql.cursors
from db.bd_mysql import get_db_connection
from models.product_model import Product
from decimal import Decimal

class ProductService:
    def __init__(self):
        self.con= get_db_connection()
        if self.con is None:
            print("No se pudo establecer en la base de datos")
    
    async def get_products(self):
        """Consulta de los productos"""
        try:
            with self.con.cursor(pymysql.cursors.DictCursor) as cursor:
                cursor.execute("SELECT * FROM producto")
                products = cursor.fetchall()

                

                return JSONResponse(
                    status_code = 200,
                    content={
                        "success":True,
                        "message":"Productos encontrados correctamente",
                        "data":products if products else []
                    }
                )
        except Exception as e:
            print("ERROR EN get_products:", e)
            return JSONResponse(
                    status_code = 500,
                    content={
                        "success":False,
                        "message":f"Error al consultar productos{str(e)}",
                        "data":None
                    }
                )
    async def get_product_by_id(self, product_id):
            
            """Consulta de los productos por id"""
            try:
                with self.con.cursor(pymysql.cursors.DictCursor) as cursor:
                    sql = "SELECT * FROM producto WHERE id_producto =%s"
                    cursor.execute(sql,(product_id,))
                    product = cursor.fetchone()
                    if product:
                        return JSONResponse(
                            status_code = 200,
                            content={
                                "success":True,
                                "message":"Producto encontrado correctamente",
                                "data":product
                            }
                        )
                    else:
                        return JSONResponse(
                            status_code = 404,
                            content={
                                "success":True,
                                "message":"Producto no encontrado ",
                                "data":product
                            }
                        )

            except Exception as e:
                return JSONResponse(
                        status_code = 500,
                        content={
                            "success":False,
                            "message":f"Error al consultar producto{str(e)}",
                            "data":None
                        }
                    )
            
    async def create_product(self, product_data:Product):
        try:
            self.con.ping(reconnect=True)
            with self.con.cursor() as cursor:
                dup="SELECT COUNT(*) from producto WHERE nombre_producto = %s"
                cursor.execute(dup,(product_data.nombre_producto,))
                result= cursor.fetchone()
                print(result)

                if result[0]>0:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "success":False,
                            "message": "producto ya se encuentra registrado",
                            "data":None
                        }
                    )
                
                sql= "INSERT INTO producto (nombre_producto,precio_compra,precio_venta,stock) VALUES (%s,%s,%s,%s)"
                cursor.execute(sql,(product_data.nombre_producto,product_data.precio_compra,product_data.precio_venta,product_data.stock))
                self.con.commit()    

                if cursor.lastrowid:
                    return JSONResponse(
                        status_code=201,
                        content={
                            "success":True,
                            "message":"Producto creado",
                            "data":{"product_id":cursor.lastrowid}
                        }
                    )
                else:
                    return JSONResponse(
                        status_code=400,
                        content={
                            "success":False,
                            "message": "Error al registrar el producto",
                            "data":None
                        }
                    )
        except Exception as e:
            self.con.rollback()
            return JSONResponse(
                status_code=500,
                content={
                    "success":False,
                    "message":f"Error al registrar el producto{str(e)}",
                    "data":None
                }
            )


    async def delete_product(self, product_id: int):
        try:
            self.con.ping(reconnect=True)
            with self.con.cursor() as cursor:
                sql = "DELETE FROM producto WHERE id_producto = %s"
                cursor.execute(sql, (product_id,))
                self.con.commit()

                if cursor.rowcount > 0:
                    return JSONResponse(
                        status_code=200,
                        content={
                            "success": True,
                            "message": "Producto eliminado correctamente",
                            "data": {"id_producto": product_id}
                        }
                    )
                else:
                    return JSONResponse(
                        status_code=404,
                        content={
                            "success": False,
                            "message": "Producto no encontrado",
                            "data": None
                        }
                    )
        except Exception as e:
            self.con.rollback()
            return JSONResponse(
                status_code=500,
                content={
                    "success": False,
                    "message": f"Error al eliminar el producto: {str(e)}",
                    "data": None
                }
        )

    async def change_product(self, product_data:Product, product_id):
            try:
                self.con.ping(reconnect=True)
                with self.con.cursor() as cursor:
                    dup="SELECT COUNT(*) from producto WHERE nombre_producto = %s"
                    cursor.execute(dup,(product_data.nombre_producto,))
                    result= cursor.fetchone()
                    print(result)

                    if result[0]==0:
                        return JSONResponse(
                            status_code=400,
                            content={
                                "success":False,
                                "message": "producto no existe",
                                "data":None
                            }
                        )
                    
                    sql = "UPDATE producto SET nombre_producto = %s, precio = %s, stock = %s WHERE id_producto = %s"
                    cursor.execute(sql,(product_data.nombre_producto,product_data.precio,product_data.stock,product_id))
                    self.con.commit()    

                    if cursor.rowcount>0:
                        return JSONResponse(
                            status_code=201,
                            content={
                                "success":True,
                                "message":"Producto actualizado",
                                "data":{"filas afectadas":cursor.rowcount}
                            }
                        )
                    else:
                        return JSONResponse(
                            status_code=400,
                            content={
                                "success":False,
                                "message": "Error al actualizar el producto",
                                "data":None
                            }
                        )
            except Exception as e:
                self.con.rollback()
                return JSONResponse(
                    status_code=500,
                    content={
                        "success":False,
                        "message":f"Error al actualizar el producto{str(e)}",
                        "data":None
                    }
                )

    