import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Venta } from "./venta.entity";
import { Producto } from "./producto.entity";

@Entity()
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @Column()
  cantidad: number;

  @Column('decimal')
  precio_unitario: number;

  @ManyToOne(() => Venta, venta => venta.detalles)
  @JoinColumn({ name: 'id_venta' })
  venta: Venta;  //Aqui se muestra el ID

  @ManyToOne(() => Producto, producto => producto.detallesVenta)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;  //Aqui se muestra el ID
}
