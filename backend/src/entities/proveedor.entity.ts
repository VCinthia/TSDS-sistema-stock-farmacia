import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lote } from "./lote.entity";

@Entity()
export class Proveedor {
  @PrimaryGeneratedColumn()
  id_proveedor: number;

  @Column()
  nombre: string;

  @Column()
  contacto: string;

  @OneToMany(() => Lote, lote => lote.proveedor)
  lotes: Lote[];
}
