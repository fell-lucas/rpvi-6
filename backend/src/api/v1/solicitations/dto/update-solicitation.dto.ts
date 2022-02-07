import { PartialType } from '@nestjs/mapped-types';
import { SolicitationStatus } from '../entities/solicitation-status.enum';
import { CreateSolicitationDto } from './create-solicitation.dto';
import { IsEnum } from 'class-validator';

export class UpdateSolicitationDto extends PartialType(CreateSolicitationDto) {
  @IsEnum(SolicitationStatus)
  status: SolicitationStatus;
}
