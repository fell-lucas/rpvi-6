import { DadosEstagio } from '../../../../models';

const sixMonthsFromNow = new Date();
sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

export const dadosEstagioInitialValues = {
  dataInicio: new Date().toLocaleDateString('pt-BR'),
  dataFim: sixMonthsFromNow.toLocaleDateString('pt-BR'),
  cargaHoraria: '4',
  horarioInicial: '09:00',
  horarioFinal: '14:00',
  intervalo: '12h - 13h',
  remunerado: '',
  valorRemuneracao: 'R$ 900,00',
  estagioObrigatorio: '',
} as DadosEstagio;
