import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReporteAnmat } from "./reporte-anmat.entity";

@Entity()
export class TicketReceta {
  @PrimaryGeneratedColumn()
  id_ticket: number;

  @Column()
  fecha_emision_receta: Date;

  @Column()
  codigo_autorizacion: string;

  @ManyToMany(() => ReporteAnmat, reporte => reporte.tickets)
  @JoinTable({ name: 'reporte_ticket' }) // Nombre de la tabla intermedia
  reportes: ReporteAnmat[];
}
