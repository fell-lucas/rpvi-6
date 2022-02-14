import { NotFoundException } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../auth/user.entity';
import { CreateObservationDto } from './dto/create-observation.dto';
import { CreateSolicitationDto } from './dto/create-solicitation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { UpdateSolicitationDto } from './dto/update-solicitation.dto';
import { Solicitation } from './entities/solicitation.entity';
import { MockSolicitation } from './mock/mock-solicitation.handler';
import { MockUser } from './mock/mock-user.handler';
import { InstitutionsRepository } from './repositories/institution.repository';
import { InternsRepository } from './repositories/interns.repository';
import { ObservationsRepository } from './repositories/observations.repository';
import { SolicitationsRepository } from './repositories/solicitations.repository';
import { UnitsRepository } from './repositories/units.repository';
import { SolicitationsController } from './solicitations.controller';
import { SolicitationsService } from './solicitations.service';

const mockSolicitationsRepository = () => ({});
const mockInternsRepository = () => ({});
const mockInstitutionsRepository = () => ({});
const mockUnitsRepository = () => ({});
const mockObservationsRepository = () => ({});

describe('SolicitacoesController', () => {
  let solicitationController: SolicitationsController;
  let solicitationsService: SolicitationsService;
  let mockSolicitation: Solicitation;
  let mockUser: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      controllers: [SolicitationsController],
      providers: [
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

    mockSolicitation = MockSolicitation({});
    solicitationController = module.get(SolicitationsController);
    solicitationsService = module.get(SolicitationsService);
    mockUser = MockUser({});
  });

  describe('findAll', () => {
    it('findAll should return expected value', async () => {
      solicitationsService.findAll = jest
        .fn()
        .mockResolvedValue([mockSolicitation]);

      const result = await solicitationController.findAll({}, mockUser);

      expect(result).toEqual([mockSolicitation]);
      expect(solicitationsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('findOne should return expected value', async () => {
      solicitationsService.findOne = jest
        .fn()
        .mockResolvedValue(mockSolicitation);

      const result = await solicitationController.findOne('1', mockUser);

      expect(result).toBe(mockSolicitation);
      expect(solicitationsService.findOne).toHaveBeenCalled();
      expect(solicitationsService.findOne).toHaveBeenCalledWith('1', mockUser);
    });

    it('findOne should return 404 when not found', async () => {
      solicitationsService.findOne = jest
        .fn()
        .mockResolvedValue(new NotFoundException());
      try {
        await solicitationController.findOne('1', mockUser);
      } catch (e) {
        expect(e).toEqual(new NotFoundException());
      }
    });
  });

  describe('create', () => {
    it('create should return expected value', async () => {
      solicitationsService.create = jest
        .fn()
        .mockResolvedValue(mockSolicitation);

      const result = await solicitationController.create(
        {} as CreateSolicitationDto,
        mockUser,
      );

      expect(result).toBe(mockSolicitation);
      expect(solicitationsService.create).toHaveBeenCalled();
      expect(solicitationsService.create).toHaveBeenCalledWith({}, mockUser);
    });
  });

  describe('createObservation', () => {
    it('createObservation should return expected value', async () => {
      solicitationsService.createObservation = jest.fn().mockResolvedValue({});

      const result = await solicitationController.createObservation(
        {} as CreateObservationDto,
        '1',
        mockUser,
      );

      expect(result).toStrictEqual({});
      expect(solicitationsService.createObservation).toHaveBeenCalled();
      expect(solicitationsService.createObservation).toHaveBeenCalledWith(
        {},
        '1',
        mockUser,
      );
    });
  });

  describe('updateObservation', () => {
    it('updateObservation should return expected changed value', async () => {
      solicitationsService.updateObservation = jest.fn().mockResolvedValue({});

      const result = await solicitationController.updateObservation(
        {} as UpdateObservationDto,
        '1',
      );

      expect(result).toStrictEqual({});
      expect(solicitationsService.updateObservation).toHaveBeenCalled();
      expect(solicitationsService.updateObservation).toHaveBeenCalledWith(
        {},
        '1',
      );
    });

    it('updateObservation should return 404 when not found', async () => {
      solicitationsService.updateObservation = jest
        .fn()
        .mockResolvedValue(new NotFoundException());
      try {
        await solicitationController.updateObservation(
          {} as UpdateObservationDto,
          '1',
        );
      } catch (e) {
        expect(e).toEqual(new NotFoundException());
      }
    });
  });

  describe('update', () => {
    it('update should return expected changed value', async () => {
      solicitationsService.update = jest
        .fn()
        .mockResolvedValue(mockSolicitation);

      const result = await solicitationController.update(
        '1',
        {} as UpdateSolicitationDto,
        mockUser,
      );

      expect(result).toBe(mockSolicitation);
      expect(solicitationsService.update).toHaveBeenCalled();
      expect(solicitationsService.update).toHaveBeenCalledWith(
        '1',
        {},
        mockUser,
      );
    });

    it('update should return 404 when not found', async () => {
      solicitationsService.update = jest
        .fn()
        .mockResolvedValue(new NotFoundException());
      try {
        await solicitationController.update(
          '1',
          {} as UpdateSolicitationDto,
          mockUser,
        );
      } catch (e) {
        expect(e).toEqual(new NotFoundException());
      }
    });
  });

  describe('delete', () => {
    it('delete should return expected deleted value', async () => {
      solicitationsService.delete = jest.fn().mockResolvedValue(undefined);

      const result = await solicitationController.delete('1', mockUser);

      expect(result).toBeUndefined();
      expect(solicitationsService.delete).toHaveBeenCalled();
      expect(solicitationsService.delete).toHaveBeenCalledWith('1', mockUser);
    });

    it('delete should return 404 when not found', async () => {
      solicitationsService.delete = jest.fn().mockImplementation(() => {
        throw new NotFoundException();
      });
      try {
        await solicitationController.delete('1', mockUser);
      } catch (e) {
        expect(e).toEqual(new NotFoundException());
      }
    });
  });
});
