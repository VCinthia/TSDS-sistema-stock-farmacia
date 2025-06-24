import { faker } from "@faker-js/faker/.";
import { Venta } from "src/entities/venta.entity";

export function generarVentaEntidad(
    overrides?: Partial<Venta>
): Venta {
    const venta = new Venta();    
    venta.fecha = faker.date.recent();//new Date();
    venta.subtotal = faker.number.float({ min: 10, max: 20000, multipleOf: 0.02 })
    venta.puntos_cliente_inicial = 0;
    venta.descuento_porcentaje = 0;
    venta.total_final = venta.subtotal;
    venta.puntos_generados = 10;
    venta.sucursal = { id_sucursal: Math.floor(Math.random() * 100) + 1 } as any;
    venta.cliente = { id_cliente: Math.floor(Math.random() * 100) + 1 } as any;
    venta.usuario = { id_usuario: Math.floor(Math.random() * 100) + 1 } as any;
    venta.detalles = [];
    
    return Object.assign(venta, overrides);
}