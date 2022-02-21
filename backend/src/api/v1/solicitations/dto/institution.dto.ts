import { IsString } from 'class-validator';
import { User } from '../../auth/user.entity';
import { Campus } from '../../campuses/entities/campus.entity';

export class InstitutionDto {
  @IsString()
  razaoSocial: string;
  @IsString()
  telefone: string;
  @IsString()
  endereco: string;
  @IsString()
  bairro: string;
  @IsString()
  cep: string;
  @IsString()
  cidade: string;
  @IsString()
  uf: string;
  @IsString()
  cnpj: string;
  @IsString()
  representanteLegal: string;
  @IsString()
  cargoRepresentante: string;
  @IsString()
  orientadorEstagio: User;
  @IsString()
  campus: Campus;
}
