import { IsString } from 'class-validator';

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
  orientadorEstagio: string;
  @IsString()
  campus: string;
}
