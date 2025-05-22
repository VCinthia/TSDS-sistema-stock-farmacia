import { CategoriaProducto } from "src/enums/categoria-producto.enum";
import { TipoProducto } from "src/enums/tipo-producto.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lote } from "./lote.entity";
import { DetalleVenta } from "./detalle-venta.entity";

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column()
  nombre: string;

  @Column({ type: 'enum', enum: CategoriaProducto })
  categoria: CategoriaProducto;

  @Column({ type: 'enum', enum: TipoProducto })
  tipo: TipoProducto;

  @Column()
  umbral_stock: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_unitario: number;

  @OneToMany(() => Lote, lote => lote.producto)
  lotes: Lote[];

  @OneToMany(() => DetalleVenta, detalle => detalle.producto)
  detallesVenta: DetalleVenta[];
}
