import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Venta } from "./venta.entity";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id_cliente: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  dni: string;

  @Column()
  puntos_fidelizacion: number;

  @OneToMany(() => Venta, venta => venta.cliente)
  ventas: Venta[];
}
