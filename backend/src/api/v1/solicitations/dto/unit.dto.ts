import { IsOptional, IsString } from 'class-validator';

export class UnitDto {
  @IsOptional()
  id: string;
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
  supervisorEstagio: string;
  @IsString()
  cargoSupervisor: string;
  @IsString()
  representanteLegal: string;
  @IsString()
  cargoRepresentante: string;
}
