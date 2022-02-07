import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Solicitation } from './solicitation.entity';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(
    (type) => Solicitation,
    (solicitation) => solicitation.unidadeConcedente,
    { onDelete: 'CASCADE' },
  )
  solicitacao!: Solicitation;

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
}
