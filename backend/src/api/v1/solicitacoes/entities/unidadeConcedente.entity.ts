import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Solicitacao } from "./solicitacao.entity";

@Entity()
export class UnidadeConcedente {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Solicitacao, solicitacao => solicitacao.unidadeConcedente, { onDelete: "CASCADE" })
  solicitacao!: Solicitacao

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