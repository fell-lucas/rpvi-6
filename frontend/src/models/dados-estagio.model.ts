export type DadosEstagio = {
  [index: string]: string | boolean;
  dataInicio: string;
  dataFim: string;
  cargaHoraria: string;
  horarioInicial: string;
  horarioFinal: string;
  intervalo: string;
  remunerado: string | boolean;
  valorRemuneracao: string;
  estagioObrigatorio: string | boolean;
};
