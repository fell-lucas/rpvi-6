import { IsNotEmpty } from 'class-validator';
import { DadosEstagioDto } from './dadosEstagio.dto';
import { InstitutionDto } from './institution.dto';
import { InternDto } from './intern.dto';
import { UnitDto } from './unit.dto';

export class CreateSolicitationDto {
  @IsNotEmpty()
  estagiario: InternDto;

  @IsNotEmpty()
  instituicao: InstitutionDto;

  @IsNotEmpty()
  unidadeConcedente: UnitDto;

  @IsNotEmpty()
  dadosEstagio: DadosEstagioDto;
}
