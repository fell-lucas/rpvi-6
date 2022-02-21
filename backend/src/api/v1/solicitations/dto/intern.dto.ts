import { IsBoolean, IsString } from 'class-validator';
import { Campus } from '../../campuses/entities/campus.entity';

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
  campus: Campus;
  @IsString()
  matricula: string;
  @IsString()
  curso: string;
  @IsString()
  semestre: string;
  @IsBoolean()
  estagioObrigatorio: boolean;
}
