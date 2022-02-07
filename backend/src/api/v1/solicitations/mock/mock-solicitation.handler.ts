import { SolicitationStatus } from '../entities/solicitation-status.enum';
import { Solicitation } from '../entities/solicitation.entity';

export function getMockForGet(_req): Solicitation {
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
      campus: 'Alegrete',
      matricula: '1920391093413',
      curso: 'Engenharia de Software',
      semestre: '1',
      estagioObrigatorio: false,
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
      orientadorEstagio: 'Orientador',
      campus: 'Alegrete',
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
    status: SolicitationStatus.IN_PROGRESS,
  } as Solicitation;
}
