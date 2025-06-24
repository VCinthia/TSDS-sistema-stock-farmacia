import { faker } from "@faker-js/faker/.";
import { Sucursal } from "src/entities/sucursal.entity";

export function generarSucursalEntidad(
    overrides?: Partial<Sucursal>
): Sucursal {
    const sucursal = new Sucursal();
    sucursal.direccion = faker.location.streetAddress();
    sucursal.telefono = faker.phone.number();
    sucursal.dias_previos_aviso = faker.number.int({ min: 1, max: 30 });
    sucursal.usuarios = [];
    sucursal.lotes = [];
    sucursal.ventas = [];

    return Object.assign(sucursal, overrides);
}