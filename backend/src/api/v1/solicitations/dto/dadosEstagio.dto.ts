import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DadosEstagioDto {
  @IsBoolean()
  estagioObrigatorio: boolean;

  @IsString()
  @IsNotEmpty()
  dataInicio: string;

  @IsString()
  @IsNotEmpty()
  dataFim: string;

  @IsNotEmpty()
  @IsString()
  cargaHoraria: string;

  @IsNotEmpty()
  @IsString()
  horarioInicial: string;

  @IsNotEmpty()
  @IsString()
  horarioFinal: string;

  @IsNotEmpty()
  @IsString()
  intervalo: string;

  @IsNotEmpty()
  @IsBoolean()
  remunerado: boolean;

  @IsString()
  @IsOptional()
  valorRemuneracao: string;
}
