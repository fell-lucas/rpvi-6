import { EstagiarioDto } from "./estagiario.dto";
import { InstituicaoDto } from "./instituicao.dto";
import { UnidadeConcedenteDto } from "./unidadeConcedente.dto";

export class CreateSolicitacaoDto {
  estagiario: EstagiarioDto;
  instituicao: InstituicaoDto;
  unidadeConcedente: UnidadeConcedenteDto;
}
