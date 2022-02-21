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
import { User } from '../../auth/user.entity';
import { Campus } from '../../campuses/entities/campus.entity';
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

  @ManyToOne((type) => User, (user) => user.orientedSolicitations, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  orientadorEstagio: User;

  @ManyToOne((type) => Campus, (campus) => campus.instituicoes, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  campus: Campus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
