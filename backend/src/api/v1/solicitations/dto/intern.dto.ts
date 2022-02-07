import { IsBoolean, IsString } from 'class-validator';

export class InternDto {
  @IsString()
  nome: string;
  @IsString()
  email: string;
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
  campus: string;
  @IsString()
  matricula: string;
  @IsString()
  curso: string;
  @IsString()
  semestre: string;
  @IsBoolean()
  estagioObrigatorio: boolean;
}
