import { faker } from "@faker-js/faker/.";
import { Producto } from "src/entities/producto.entity";
import { CategoriaProducto } from "src/enums/categoria-producto.enum";
import { TipoProducto } from "src/enums/tipo-producto.enum";

export function generarProductoEntidad(
    overrides?: Partial<Producto>
): Producto {
    const producto = new Producto();
    producto.codigo_nacional = faker.string.alphanumeric(10).toUpperCase();
    producto.nombre = faker.commerce.productName();
    producto.categoria = overrides?.categoria ?? CategoriaProducto.MEDICAMENTO;
    producto.tipo = overrides?.tipo ?? TipoProducto.VENTA_LIBRE;
    producto.umbral_stock = faker.number.int({ min: 0, max: 100 });
    producto.precio_unitario = faker.number.float({ min: 10, max: 20000, fractionDigits: 2 });

    return Object.assign(producto, overrides);
}