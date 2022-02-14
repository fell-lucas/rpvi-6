/* istanbul ignore file */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Solicitation } from './solicitation.entity';

@Entity()
export class Observation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    (_type) => Solicitation,
    (solicitation) => solicitation.observacoes,
    {
      eager: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  solicitacao!: Solicitation;

  @Column()
  observacao: string;

  @Column()
  nomeAutor: string;

  @Column()
  resolved: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
