import { Campus, Instituicao } from '../../../../models';

export const instituicaoInitialValues = {
  razaoSocial: 'Fundação Universidade Federal do Pampa',
  telefone: '',
  endereco: '',
  bairro: '',
  cep: '',
  cidade: '',
  uf: 'RS',
  cnpj: '09341233000122',
  representanteLegal: '',
  cargoRepresentante: '',
  orientadorEstagio: '',
  campus: '',
} as Instituicao;

export const mapCampusWithAddress = (campus?: Campus) => {
  if (!campus) return;
  switch (campus.cidade) {
    case 'Alegrete':
      return {
        campus: campus.id,
        telefone: '5534218400',
        endereco: 'Av. Tiarajú, 810',
        bairro: 'Ibirapuitã',
        cep: '96570000',
        cidade: 'Alegrete',
        uf: 'RS',
      };
    case 'Uruguaiana':
      return {
        campus: campus.id,
        telefone: '5539110200',
        endereco: 'BR 472 - Km 585',
        bairro: 'Caixa Postal 118',
        cep: '97501970',
        cidade: 'Uruguaiana',
        uf: 'RS',
      };
    default:
      return {};
  }
};
