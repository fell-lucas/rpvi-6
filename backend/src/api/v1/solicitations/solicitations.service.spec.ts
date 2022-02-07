import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateSolicitationDto } from './dto/update-solicitation.dto';
import { SolicitationStatus } from './entities/solicitation-status.enum';
import { getMockForGet } from './mock/mock-solicitation.handler';
import { InstitutionsRepository } from './repositories/institution.repository';
import { InternsRepository } from './repositories/interns.repository';
import { SolicitationsRepository } from './repositories/solicitations.repository';
import { UnitsRepository } from './repositories/units.repository';
import { SolicitationsService } from './solicitations.service';

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

describe('SolicitationsService', () => {
  let solicitationsService: SolicitationsService;
  let solicitationsRepository;
  let internsRepository;
  let institutionsRepository;
  let unitsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      ],
    }).compile();

    solicitationsService = module.get(SolicitationsService);
    solicitationsRepository = module.get(SolicitationsRepository);
    internsRepository = module.get(InternsRepository);
    institutionsRepository = module.get(InstitutionsRepository);
    unitsRepository = module.get(UnitsRepository);
  });

  describe('findOne', () => {
    it('calls SolicitationsRepository.findOne and returns de results', async () => {
      const mockSolicitation = getMockForGet({});

      solicitationsRepository.findOne.mockResolvedValue(mockSolicitation);
      const result = await solicitationsService.findOne('someId');
      expect(result).toEqual(mockSolicitation);
    });

    it('calls SolicitationsRepository.findOne and handles an error', async () => {
      solicitationsRepository.findOne.mockResolvedValue(null);
      expect(solicitationsService.findOne('someId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('calls SolicitationsRepository.findAll and returns the result', async () => {
      solicitationsRepository.findAllSolicitations.mockResolvedValue(
        'someValue',
      );
      const result = await solicitationsService.findAll({});
      expect(result).toEqual('someValue');
    });
  });

  describe('create', () => {
    it('calls SolicitationsRepository.create and returns the result', async () => {
      solicitationsRepository.createSolicitation.mockResolvedValue('someValue');
      const result = await solicitationsService.create(null);
      expect(result).toEqual('someValue');
    });
  });

  describe('update', () => {
    it('calls SolicitationsRepository.update and returns the result', async () => {
      const mockSolicitation = getMockForGet({});
      const mockUpdateValue = {
        estagiario: {
          nome: 'someName',
        },
        instituicao: {
          razaoSocial: 'someInstituicao',
        },
        unidadeConcedente: {
          razaoSocial: 'someUnidade',
        },
        status: SolicitationStatus.APPROVED,
      };

      solicitationsRepository.findOne.mockResolvedValue(mockSolicitation);
      const result = await solicitationsService.update(
        'someId',
        mockUpdateValue as UpdateSolicitationDto,
      );
      expect(result).toEqual(mockSolicitation);
      expect(result.estagiario.nome).toEqual('someName');
      expect(result.instituicao.razaoSocial).toEqual('someInstituicao');
      expect(result.unidadeConcedente.razaoSocial).toEqual('someUnidade');
    });
  });

  describe('delete', () => {
    it('calls SolicitationsRepository.delete and not throws error', async () => {
      const mockSolicitation = getMockForGet({});

      solicitationsRepository.findOne.mockResolvedValue(mockSolicitation);

      expect(await solicitationsService.delete('someId')).toBeUndefined();
    });
  });
});
