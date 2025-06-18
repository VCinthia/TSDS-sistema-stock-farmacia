import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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
  matricula_medico: string; 

  @Column()
  dni_paciente: string; 

  @OneToOne(() => ReporteAnmat, {nullable: true, cascade: true , onDelete: 'SET NULL' })
  @JoinColumn({ name: 'id_reporteAnmat' }) 
  reporteAnmat?: ReporteAnmat; //Aqui se muestra el ID 
}
