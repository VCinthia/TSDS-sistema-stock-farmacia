import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
  producto: Producto; //Aqui se muestra el ID
 
  @ManyToOne(() => Proveedor, proveedor => proveedor.lotes)
  proveedor: Proveedor;  //Aqui se muestra el ID

  @ManyToOne(() => Sucursal, sucursal => sucursal.lotes)
  sucursal: Sucursal;  //Aqui se muestra el ID
}
