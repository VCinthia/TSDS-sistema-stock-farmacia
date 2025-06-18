import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./producto.entity";
import { Proveedor } from "./proveedor.entity";
import { Sucursal } from "./sucursal.entity";

@Entity()
export class Lote {
  @PrimaryGeneratedColumn()
  id_lote: number;

  @Column()
  fecha_vencimiento: Date;

  @Column()
  cantidad: number;

  @ManyToOne(() => Producto, producto => producto.lotes)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto; //Aqui se muestra el ID
 
  @ManyToOne(() => Proveedor, proveedor => proveedor.lotes)
  @JoinColumn({ name: 'id_proveedor' })
  proveedor: Proveedor;  //Aqui se muestra el ID

  @ManyToOne(() => Sucursal, sucursal => sucursal.lotes)
  @JoinColumn({ name: 'id_sucursal' })
  sucursal: Sucursal;  //Aqui se muestra el ID
}
