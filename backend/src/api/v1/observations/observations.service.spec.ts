import { NotFoundException } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '../auth/user-role.enum';
import { User } from '../auth/user.entity';
import { Solicitation } from '../solicitations/entities/solicitation.entity';
import { MockSolicitation } from '../solicitations/mock/mock-solicitation.handler';
import { MockUser } from '../solicitations/mock/mock-user.handler';
import { InstitutionsRepository } from '../solicitations/repositories/institution.repository';
import { InternsRepository } from '../solicitations/repositories/interns.repository';
import { SolicitationsRepository } from '../solicitations/repositories/solicitations.repository';
import { UnitsRepository } from '../solicitations/repositories/units.repository';
import { SolicitationsService } from '../solicitations/solicitations.service';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { Observation } from './entities/observation.entity';
import { MockObservation } from './mock/mock-observation.handler';
import { ObservationsService } from './observations.service';
import { ObservationsRepository } from './repositories/observations.repository';

const mockSolicitationsRepository = () => ({
  findOne: jest.fn(),
  findAllSolicitations: jest.fn(),
  createSolicitation: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});
const mockInternsRepository = () => ({
  delete: jest.fn(),
});
const mockInstitutionsRepository = () => ({
  delete: jest.fn(),
});
const mockUnitsRepository = () => ({
  delete: jest.fn(),
});
const mockObservationsRepository = () => ({
  createObservation: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
});

describe('ObservationsService', () => {
  let service: ObservationsService;
  let solicitationsService: SolicitationsService;
  let observationsRepository;
  let solicitationsRepository;
  let mockUser: User;
  let mockObservation: Observation;
  let mockSolicitation: Solicitation;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [
        ObservationsService,
        SolicitationsService,
        {
          provide: SolicitationsRepository,
          useFactory: mockSolicitationsRepository,
        },
        {
          provide: InternsRepository,
          useFactory: mockInternsRepository,
        },
        {
          provide: InstitutionsRepository,
          useFactory: mockInstitutionsRepository,
        },
        {
          provide: UnitsRepository,
          useFactory: mockUnitsRepository,
        },
        {
          provide: ObservationsRepository,
          useFactory: mockObservationsRepository,
        },
      ],
    }).compile();

    service = module.get(ObservationsService);
    solicitationsService = module.get(SolicitationsService);
    observationsRepository = module.get(ObservationsRepository);
    solicitationsRepository = module.get(SolicitationsRepository);
    mockUser = MockUser({});
    mockObservation = MockObservation({});
    mockSolicitation = MockSolicitation({});
  });

  describe('createObservation', () => {
    it('calls ObservationsRepository.createObservation and returns the result', async () => {
      mockUser.role = UserRole.INTERFACE;
      observationsRepository.createObservation.mockResolvedValue('someValue');
      solicitationsService.findOne = jest
        .fn()
        .mockResolvedValue(mockSolicitation);
      solicitationsService.update = jest
        .fn()
        .mockResolvedValue(mockSolicitation);
      const result = await service.create(null, '1', mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('update', () => {
    it('calls ObservationsRepository.update and returns the result', async () => {
      const mockObservation = {
        observation: 'Test',
        resolved: false,
        solicitacao: { status: 'APPROVED' },
      };
      const mockUpdateValue = {
        resolved: true,
      };

      observationsRepository.findOne.mockResolvedValue(mockObservation);
      observationsRepository.find.mockResolvedValue([mockObservation]);
      observationsRepository.save.mockResolvedValue(mockObservation);
      solicitationsRepository.save.mockResolvedValue({});

      const result = await service.update(
        mockUpdateValue as UpdateObservationDto,
        'someId',
        mockUser,
      );
      expect(result).toEqual(mockObservation);
      expect(result.resolved).toBeTruthy();
    });

    it('calls ObservationsRepository.findOne and handles an error', async () => {
      const mockUpdateValue = {
        resolved: true,
      };

      observationsRepository.findOne.mockResolvedValue(null);
      observationsRepository.find.mockResolvedValue([]);
      observationsRepository.save.mockResolvedValue(mockObservation);
      solicitationsRepository.save.mockResolvedValue({});

      expect(
        service.update(
          mockUpdateValue as UpdateObservationDto,
          'someId',
          mockUser,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
