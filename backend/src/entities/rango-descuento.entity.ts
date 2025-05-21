import { Segmento } from "src/enums/segmento.enum";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class RangoDescuento {
  @PrimaryColumn({ type: 'enum', enum: Segmento })
  segmento: Segmento;

  @Column()
  puntos_minimos: number;

  @Column('decimal')
  descuento_porcentaje: number;
}
