/* istanbul ignore file */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Institution } from './institution.entity';
import { Intern } from './intern.entity';
import { Observation } from './observations.entity';
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

  @OneToMany(() => Observation, (observacao) => observacao.solicitacao, {
    eager: true,
    cascade: true,
  })
  observacoes: Observation[];

  @Column()
  status: SolicitationStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
