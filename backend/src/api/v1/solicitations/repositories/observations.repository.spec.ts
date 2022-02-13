import { Test, TestingModule } from '@nestjs/testing';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateObservationDto } from '../dto/create-observation.dto';
import { CreateSolicitationDto } from '../dto/create-solicitation.dto';
import { SolicitationStatus } from '../entities/solicitation-status.enum';
import { Solicitation } from '../entities/solicitation.entity';
import { getMockForGet } from '../mock/mock-solicitation.handler';
import { ObservationsRepository } from './observations.repository';
import { SolicitationsRepository } from './solicitations.repository';

describe('Observations Repository', () => {
  let observationsRepository: ObservationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObservationsRepository],
    }).compile();

    observationsRepository = module.get(ObservationsRepository);
  });

  describe('createObservation', () => {
    it('calls ObservationsRepository.createObservation and returns the result', async () => {
      const mockSolicitation = getMockForGet({});
      jest
        .spyOn(Repository.prototype, 'create')
        .mockReturnValue('createdObservation');
      jest.spyOn(Repository.prototype, 'save').mockReturnThis();

      const createdObservation = await observationsRepository.createObservation(
        { observation: 'Test' } as CreateObservationDto,
        mockSolicitation as Solicitation,
      );
      expect(createdObservation).toEqual('createdObservation');
    });
  });
});
