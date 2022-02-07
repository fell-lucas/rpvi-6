import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Institution } from './institution.entity';
import { Intern } from './intern.entity';
import { SolicitationStatus } from './solicitation-status.enum';
import { Unit } from './unit.entity';

@Entity()
export class Solicitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Intern, { eager: true, cascade: true })
  @JoinColumn()
  estagiario: Intern;

  @OneToOne(() => Unit, { eager: true, cascade: true })
  @JoinColumn()
  unidadeConcedente: Unit;

  @OneToOne(() => Institution, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  instituicao: Institution;

  @Column()
  status: SolicitationStatus;
}
