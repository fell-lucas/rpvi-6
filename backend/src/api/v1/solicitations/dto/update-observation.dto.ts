import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';
import { CreateObservationDto } from './create-observation.dto';

export class UpdateObservationDto extends PartialType(CreateObservationDto) {
  @IsBoolean()
  resolved: boolean;
}
