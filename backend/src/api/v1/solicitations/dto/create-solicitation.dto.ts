import { IsNotEmpty, IsString } from 'class-validator';
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
}
