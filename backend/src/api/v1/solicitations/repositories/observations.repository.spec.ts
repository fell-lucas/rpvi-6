import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { User } from '../../auth/user.entity';
import { CreateObservationDto } from '../dto/create-observation.dto';
import { Solicitation } from '../entities/solicitation.entity';
import { MockSolicitation } from '../mock/mock-solicitation.handler';
import { MockUser } from '../mock/mock-user.handler';
import { ObservationsRepository } from './observations.repository';

describe('Observations Repository', () => {
  let observationsRepository: ObservationsRepository;
  let mockUser: User;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [ObservationsRepository],
    }).compile();

    observationsRepository = module.get(ObservationsRepository);
    mockUser = MockUser({});
  });

  describe('createObservation', () => {
    it('calls ObservationsRepository.createObservation and returns the result', async () => {
      const mockSolicitation = MockSolicitation({});
      jest
        .spyOn(Repository.prototype, 'create')
        .mockReturnValue('createdObservation');
      jest.spyOn(Repository.prototype, 'save').mockReturnThis();

      const createdObservation = await observationsRepository.createObservation(
        { observation: 'Test' } as CreateObservationDto,
        mockSolicitation as Solicitation,
        mockUser,
      );
      expect(createdObservation).toEqual('createdObservation');
    });
  });
});
