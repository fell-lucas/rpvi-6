import { Observation } from '../entities/observation.entity';

export function MockObservation(_req): Observation {
  return {
    nomeAutor: 'Teste',
    observacao: 'Observação',
    resolved: false,
    solicitacao: {},
  } as Observation;
}
