import { IsString } from 'class-validator';

export class CreateCampusDto {
  @IsString()
  cidade: string;
}
