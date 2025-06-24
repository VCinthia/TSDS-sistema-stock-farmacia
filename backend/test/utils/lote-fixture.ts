import { Lote } from "src/entities/lote.entity";

export function generarLoteEntidad(
    overrides?: Partial<Lote>
): Lote {
    const lote = new Lote();
    lote.fecha_vencimiento = new Date(
        Date.now() + Math.floor(Math.random() * 1000000000)
    );
    lote.cantidad = Math.floor(Math.random() * 100) + 1;
    lote.proveedor = { id_proveedor: Math.floor(Math.random() * 100) + 1 } as any;

    return Object.assign(lote, overrides);
}