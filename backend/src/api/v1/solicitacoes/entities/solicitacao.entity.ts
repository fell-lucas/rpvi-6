import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Estagiario } from "./estagiario.entity";
import { Instituicao } from "./instituicao.entity";
import { UnidadeConcedente } from "./unidadeConcedente.entity";

@Entity()
export class Solicitacao {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Estagiario, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  estagiario: Estagiario;

  @OneToOne(() => UnidadeConcedente, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  unidadeConcedente: UnidadeConcedente;

  @OneToOne(() => Instituicao, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  instituicao: Instituicao;
}