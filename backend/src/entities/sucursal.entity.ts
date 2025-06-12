import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Lote } from "./lote.entity";
import { Venta } from "./venta.entity";

@Entity()
export class Sucursal {
@PrimaryGeneratedColumn()
  id_sucursal: number;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column()
  dias_previos_aviso: number;

  @OneToMany(() => Usuario, usuario => usuario.sucursal)
  usuarios: Usuario[];

  @OneToMany(() => Lote, lote => lote.sucursal)
  lotes: Lote[];

  @OneToMany(() => Venta, venta => venta.sucursal)
  ventas: Venta[];
}
