from db.bd_mysql import get_connection
from models.product_model import ProductIn

def get_all_products():
    try:
        conn = get_connection()
        if conn is None:
            return []
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM productos")
        result = cursor.fetchall()
        return result
    except Exception as e:
        print(f"Error al obtener productos: {e}")
        return []
    finally:
        if conn:
            conn.close()

def create_product(producto: ProductIn):
    try:
        conn = get_connection()
        if conn is None:
            return False
        cursor = conn.cursor()
        cursor.execute("INSERT INTO productos (nombre, precio_compra, precio_venta) VALUES (%s, %s, %s)",
                       (producto.nombre, producto.precio_compra, producto.precio_venta))
        conn.commit()
        return True
    except Exception as e:
        print(f"Error al crear producto: {e}")
        return False
    finally:
        if conn:
            conn.close()

def update_product(id: int, producto: ProductIn):
    try:
        conn = get_connection()
        if conn is None:
            return False
        cursor = conn.cursor()
        cursor.execute("UPDATE productos SET nombre=%s, precio_compra=%s, precio_venta=%s WHERE id=%s",
                       (producto.nombre, producto.precio_compra, producto.precio_venta, id))
        conn.commit()
        return cursor.rowcount > 0
    except Exception as e:
        print(f"Error al actualizar producto: {e}")
        return False
    finally:
        if conn:
            conn.close()

def delete_product(id: int):
    try:
        conn = get_connection()
        if conn is None:
            return False
        cursor = conn.cursor()
        cursor.execute("DELETE FROM productos WHERE id=%s", (id,))
        conn.commit()
        return cursor.rowcount > 0
    except Exception as e:
        print(f"Error al eliminar producto: {e}")
        return False
    finally:
        if conn:
            conn.close()
