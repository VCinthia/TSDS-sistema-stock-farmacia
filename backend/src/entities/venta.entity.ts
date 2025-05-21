import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./cliente.entity";
import { Usuario } from "./usuario.entity";
import { TicketReceta } from "./ticket-receta.entity";
import { DetalleVenta } from "./detalle-venta.entity";

@Entity()
export class Venta {
  @PrimaryGeneratedColumn()
  id_venta: number;

  @Column()
  fecha: Date;

  @Column('decimal')
  subtotal: number;

  @Column()
  puntos_cliente_inicial: number;

  @Column('decimal')
  descuento_porcentaje: number;

  @Column('decimal')
  total_final: number;

  @Column()
  puntos_generados: number;

  @ManyToOne(() => Cliente, cliente => cliente.ventas)
  cliente: Cliente;  //Aqui se muestra el ID

  @ManyToOne(() => Usuario, usuario => usuario.ventas)
  usuario: Usuario;  //Aqui se muestra el ID

  @OneToOne(() => TicketReceta, { nullable: true })  // Permite valores null
  @JoinColumn()
  ticketReceta?: TicketReceta; //Aqui se muestra el ID

  @OneToMany(() => DetalleVenta, detalle => detalle.venta)
  detalles: DetalleVenta[];
}
