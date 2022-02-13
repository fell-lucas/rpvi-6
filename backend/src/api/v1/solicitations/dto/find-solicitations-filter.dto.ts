import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { SolicitationStatus } from '../entities/solicitation-status.enum';

export class FindAllSolicitationsFilterDto {
  @IsOptional()
  @IsEnum(SolicitationStatus)
  status?: SolicitationStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  page?: number;
}
