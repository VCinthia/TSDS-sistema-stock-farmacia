import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReporteAnmat } from "./reporte-anmat.entity";
import { ProductoPrescritoDto } from "src/modules/venta/dto/receta-valida.dto";

@Entity()
export class TicketReceta {
  @PrimaryGeneratedColumn()
  id_ticket: number;

  @Column()
  fecha_emision: Date;

  @Column()
  fecha_expiracion: Date;

  @Column()
  fecha_recepcion: Date;

  @Column({ type: 'json' })
  detalle_productos: ProductoPrescritoDto[];

  @Column()
  numero_receta: string;

  @Column()
  maricula_medico: string; 

  @Column()
  dni_paciente: string; 

  @ManyToMany(() => ReporteAnmat, reporte => reporte.tickets)
  @JoinTable({ name: 'reporte_ticket' }) // Nombre de la tabla intermedia
  reportes: ReporteAnmat[];
}
