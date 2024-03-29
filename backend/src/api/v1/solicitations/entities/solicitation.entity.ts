/* istanbul ignore file */
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/user.entity';
import { Observation } from '../../observations/entities/observation.entity';
import { Institution } from './institution.entity';
import { Intern } from './intern.entity';
import { InternshipData } from './internshipData.entity';
import { SolicitationStatus } from './solicitation-status.enum';
import { Unit } from './unit.entity';

@Entity()
export class Solicitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Intern, { eager: true, cascade: true })
  @JoinColumn()
  estagiario: Intern;

  @ManyToOne((type) => Unit, (unit) => unit.solicitacoes, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  unidadeConcedente: Unit;

  @OneToOne(() => Institution, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  instituicao: Institution;

  @OneToMany((_type) => Observation, (observacao) => observacao.solicitacao, {
    eager: false,
  })
  observacoes: Observation[];

  @Column()
  status: SolicitationStatus;

  @ManyToOne((type) => User, (user) => user.solicitations, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn()
  @Exclude({ toPlainOnly: true })
  user!: User;

  @OneToOne(() => InternshipData, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  dadosEstagio: InternshipData;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
