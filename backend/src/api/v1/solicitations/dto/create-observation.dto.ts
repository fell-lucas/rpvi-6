import { IsNotEmpty, IsString } from 'class-validator';
import { InstitutionDto } from './institution.dto';
import { InternDto } from './intern.dto';
import { UnitDto } from './unit.dto';

export class CreateObservationDto {
  @IsNotEmpty()
  observation: string;
}
