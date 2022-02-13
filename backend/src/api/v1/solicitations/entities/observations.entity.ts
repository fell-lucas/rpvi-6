/* istanbul ignore file */
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
import { Solicitation } from './solicitation.entity';

@Entity()
export class Observation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    (type) => Solicitation,
    (solicitation) => solicitation.observacoes,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  solicitacao!: Solicitation;

  @Column()
  observacao: string;

  @Column()
  resolved: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
