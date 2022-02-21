/* istanbul ignore file */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Campus } from '../../campuses/entities/campus.entity';
import { Solicitation } from './solicitation.entity';

@Entity()
export class Intern {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne((type) => Solicitation, (solicitation) => solicitation.estagiario, {
    onDelete: 'CASCADE',
  })
  solicitacao!: Solicitation;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  endereco: string;

  @Column()
  bairro: string;

  @Column()
  cep: string;

  @Column()
  cidade: string;

  @Column()
  uf: string;

  @ManyToOne((type) => Campus, (campus) => campus.estagiarios, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  campus: Campus;

  @Column()
  matricula: string;

  @Column()
  curso: string;

  @Column()
  semestre: string;

  @Column()
  estagioObrigatorio: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
