import { IsNotEmpty } from 'class-validator';

export class CreateObservationDto {
  @IsNotEmpty()
  observacao: string;
}
