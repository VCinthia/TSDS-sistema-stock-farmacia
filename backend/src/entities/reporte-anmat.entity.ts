import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { TicketReceta } from "./ticket-receta.entity";

@Entity()
export class ReporteAnmat {
  @PrimaryGeneratedColumn()
  id_reporte: number;

  @Column()
  fecha_envio: Date;

  @Column()
  respuesta_api: string;

  @ManyToMany(() => TicketReceta, ticket => ticket.reportes)
  tickets: TicketReceta[];
}
