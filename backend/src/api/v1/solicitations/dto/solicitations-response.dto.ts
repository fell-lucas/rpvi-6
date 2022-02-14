import { IsOptional } from 'class-validator';
import { Solicitation } from '../entities/solicitation.entity';

export class SolicitationsResponse {
  solicitations: Solicitation[];

  @IsOptional()
  nextPage?: number;
}
