import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Solicitacao } from "./solicitacao.entity";

@Entity()
export class Instituicao {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Solicitacao, solicitacao => solicitacao.instituicao, { onDelete: "CASCADE" })
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
  representanteLegal: string;

  @Column()
  cargoRepresentante: string;

  @Column()
  orientadorEstagio: string;

  @Column()
  telefoneOrientador: string;
}