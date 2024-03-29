import { SolicitationStatus } from '../entities/solicitation-status.enum';
import { Solicitation } from '../entities/solicitation.entity';

export function MockSolicitation(_req): Solicitation {
  return {
    estagiario: {
      nome: 'Joao',
      email: 'joao@gmail.com',
      telefone: '5555',
      endereco: 'Endereco',
      bairro: 'Bairro',
      cep: '96570000',
      cidade: 'Cidade',
      uf: 'UF',
      campus: { cidade: 'Alegrete' },
      matricula: '1920391093413',
      curso: 'Engenharia de Software',
      semestre: '1',
    },
    instituicao: {
      razaoSocial: 'UNIPAMPA',
      telefone: '55555',
      endereco: 'Endereco',
      bairro: 'Bairro',
      cep: '96877504',
      cidade: 'Cidade',
      uf: 'UF',
      cnpj: '128371287481349',
      representanteLegal: 'Representante',
      cargoRepresentante: 'Cargo',
      orientadorEstagio: { id: 'id' },
      campus: { cidade: 'Alegrete' },
    },
    unidadeConcedente: {
      razaoSocial: 'UNIPAMPA',
      telefone: '55555',
      endereco: 'Endereco',
      bairro: 'Bairro',
      cep: '96877504',
      cidade: 'Cidade',
      uf: 'UF',
      cnpj: '128371287481349',
      supervisorEstagio: 'Supervisor',
      cargoSupervisor: 'Cargo',
      representanteLegal: 'Representante',
      cargoRepresentante: 'Cargo',
    },
    status: SolicitationStatus.IN_REVIEW,
    observacoes: [
      {
        id: 'MockId',
        observacao: 'Observation',
        nomeAutor: 'Name',
        resolved: false,
      },
    ],
    dadosEstagio: {
      cargaHoraria: undefined,
      dataFim: undefined,
      dataInicio: undefined,
      estagioObrigatorio: undefined,
      horarioFinal: undefined,
      horarioInicial: undefined,
      intervalo: undefined,
      remunerado: undefined,
      valorRemuneracao: undefined,
    },
  } as Solicitation;
}
