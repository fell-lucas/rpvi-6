import { IsNotEmpty } from 'class-validator';

export class CreateObservationDto {
  @IsNotEmpty()
  observation: string;
}
