import { Rol } from "src/enums/rol.enum";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sucursal } from "./sucursal.entity";
import { Venta } from "./venta.entity";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Rol })
  rol: Rol;

  @ManyToOne(() => Sucursal, sucursal => sucursal.usuarios)
  sucursal: Sucursal;  //Aqui se muestra el ID

  @OneToMany(() => Venta, venta => venta.usuario)
  ventas: Venta[];
}
