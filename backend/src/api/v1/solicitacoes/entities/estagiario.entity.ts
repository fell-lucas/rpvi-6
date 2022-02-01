import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Solicitacao } from "./solicitacao.entity";

@Entity()
export class Estagiario {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Solicitacao, solicitacao => solicitacao.estagiario, { onDelete: "CASCADE" })
  solicitacao!: Solicitacao

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

  @Column()
  campus: string;

  @Column()
  matricula: string;

  @Column()
  curso: string;

  @Column()
  semestre: string;

  @Column()
  estagioObrigatorio: boolean;
}