/* istanbul ignore file */
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Solicitation } from './solicitation.entity';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(
    (_type) => Solicitation,
    (solicitation) => solicitation.unidadeConcedente,
    {
      eager: false,
    },
  )
  solicitacoes!: Solicitation[];

  @Column()
  razaoSocial: string;

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

  @Column()
  cnpj: string;

  @Column()
  supervisorEstagio: string;

  @Column()
  cargoSupervisor: string;

  @Column()
  representanteLegal: string;

  @Column()
  cargoRepresentante: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
