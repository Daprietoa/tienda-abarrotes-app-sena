import pymysql
from dotenv import load_dotenv
import os

load_dotenv()

MYSQL_USER = os.environ["MYSQL_USER"]
MYSQL_PASSWORD= os.environ["MYSQL_PASSWORD"]
MYSQL_HOST = os.environ["MYSQL_HOST"]
MYSQL_PORT = os.environ["MYSQL_PORT"]
MYSQL_DATABASE= os.environ["MYSQL_DATABASE"]


class ConnectDB:
    def __init__(self):
        self.connection = None
        self.connect()

    def connect(self):
        """Establecer la conexion a la base de datos"""
        if not self.connection or not self.connection.open:
            try:
                self.connection = pymysql.connect(
                    host= MYSQL_HOST,
                    user= MYSQL_USER,
                    password=MYSQL_PASSWORD,
                    db=MYSQL_DATABASE,
                    port=int(MYSQL_PORT)

                )
                print("conexión exitosa")
            except Exception as e:
                print(f"Error al conectar: {e}")

        return self.connection
    
    def close_connection(self):
        """Cerrar la conexión de la base de datos si esta activa"""

        if self.connection and self.connection.open:
            self.connection.close()
            print("conexión cerrada") 

db_conn= ConnectDB()

def get_db_connection():
    return db_conn.connect() 