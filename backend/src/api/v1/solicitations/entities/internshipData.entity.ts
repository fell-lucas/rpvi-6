/* istanbul ignore file */
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Solicitation } from './solicitation.entity';

@Entity()
export class InternshipData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(
    (type) => Solicitation,
    (solicitation) => solicitation.dadosEstagio,
    {
      onDelete: 'CASCADE',
    },
  )
  solicitacao!: Solicitation;

  @Column()
  estagioObrigatorio: boolean;

  @Column()
  dataInicio: string;

  @Column()
  dataFim: string;

  @Column()
  cargaHoraria: string;

  @Column()
  horarioInicial: string;

  @Column()
  horarioFinal: string;

  @Column()
  intervalo: string;

  @Column()
  remunerado: boolean;

  @Column()
  valorRemuneracao: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
