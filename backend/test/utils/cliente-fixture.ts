import { faker } from "@faker-js/faker/.";
import { Cliente } from "src/entities/cliente.entity";

export function generarClienteEntidad(
    overrides?: Partial<Cliente>
): Cliente {
    const cliente = new Cliente();
    cliente.nombre = faker.person.fullName();
    cliente.dni = faker.string.numeric(8);
    cliente.puntos_fidelizacion = faker.number.int({ min: 0, max: 100 });
    cliente.ventas = [{ id_venta: Math.floor(Math.random() * 100) + 1 } as any];

    return Object.assign(cliente, overrides);
}