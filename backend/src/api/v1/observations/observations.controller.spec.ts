import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../auth/user.entity';
import { MockUser } from '../solicitations/mock/mock-user.handler';
import { InstitutionsRepository } from '../solicitations/repositories/institution.repository';
import { InternsRepository } from '../solicitations/repositories/interns.repository';
import { SolicitationsRepository } from '../solicitations/repositories/solicitations.repository';
import { UnitsRepository } from '../solicitations/repositories/units.repository';
import { SolicitationsService } from '../solicitations/solicitations.service';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { Observation } from './entities/observation.entity';
import { MockObservation } from './mock/mock-observation.handler';
import { ObservationsController } from './observations.controller';
import { ObservationsService } from './observations.service';
import { ObservationsRepository } from './repositories/observations.repository';

const mockSolicitationsRepository = () => ({});
const mockObservationsRepository = () => ({});
const mockInternsRepository = () => ({});
const mockInstitutionsRepository = () => ({});
const mockUnitsRepository = () => ({});

describe('ObservationsController', () => {
  let controller: ObservationsController;
  let service: ObservationsService;
  let mockUser: User;
  let mockObservation: Observation;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObservationsController],
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

    controller = module.get<ObservationsController>(ObservationsController);
    service = module.get(ObservationsService);
    mockUser = MockUser({});
    mockObservation = MockObservation({});
  });

  describe('findAll', () => {
    it('findAll should return expected value', async () => {
      service.findAll = jest.fn().mockResolvedValue([mockObservation]);

      const result = await controller.findAll('1');

      expect(result).toEqual([mockObservation]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('create should return expected value', async () => {
      service.create = jest.fn().mockResolvedValue({});

      const result = await controller.create(
        {} as CreateObservationDto,
        '1',
        mockUser,
      );

      expect(result).toStrictEqual({});
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledWith({}, '1', mockUser);
    });
  });

  describe('update', () => {
    it('update should return expected changed value', async () => {
      service.update = jest.fn().mockResolvedValue({});

      const result = await controller.update(
        {} as UpdateObservationDto,
        '1',
        mockUser,
      );

      expect(result).toStrictEqual({});
      expect(service.update).toHaveBeenCalled();
      expect(service.update).toHaveBeenCalledWith({}, '1', mockUser);
    });

    it('update should return 404 when not found', async () => {
      service.update = jest.fn().mockResolvedValue(new NotFoundException());
      try {
        await controller.update({} as UpdateObservationDto, '1', mockUser);
      } catch (e) {
        expect(e).toEqual(new NotFoundException());
      }
    });
  });
});
