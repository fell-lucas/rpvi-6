import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Solicitation } from './solicitation.entity';

@Entity()
export class Institution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(
    (type) => Solicitation,
    (solicitation) => solicitation.instituicao,
    {
      onDelete: 'CASCADE',
    },
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
  representanteLegal: string;

  @Column()
  cargoRepresentante: string;

  @Column()
  orientadorEstagio: string;

  @Column()
  campus: string;
}