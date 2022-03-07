import { NotFoundException } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '../auth/user-role.enum';
import { User } from '../auth/user.entity';
import { UpdateSolicitationDto } from './dto/update-solicitation.dto';
import { SolicitationStatus } from './entities/solicitation-status.enum';
import { Solicitation } from './entities/solicitation.entity';
import { MockSolicitation } from './mock/mock-solicitation.handler';
import { MockUser } from './mock/mock-user.handler';
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
  let mockUser: User;
  let mockSolicitation: Solicitation;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
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
    mockUser = MockUser({});
    mockSolicitation = MockSolicitation({});
  });

  describe('findOne', () => {
    it('calls SolicitationsRepository.findOne and returns de results', async () => {
      mockUser.role == UserRole.ALUNO;
      solicitationsRepository.findOne.mockResolvedValue(mockSolicitation);
      const result = await solicitationsService.findOne('someId', mockUser);
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
      const result = await solicitationsService.findAll({}, mockUser, 1, 1);
      expect(result).toEqual('someValue');
    });
  });

  describe('create', () => {
    it('calls SolicitationsRepository.create and returns the result', async () => {
      solicitationsRepository.createSolicitation.mockResolvedValue('someValue');
      const result = await solicitationsService.create(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('update', () => {
    it('calls SolicitationsRepository.update and returns the result', async () => {
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
        mockUser,
      );
      expect(result).toEqual(mockSolicitation);
      expect(result.estagiario.nome).toEqual('someName');
      expect(result.instituicao.razaoSocial).toEqual('someInstituicao');
      expect(result.unidadeConcedente.razaoSocial).toEqual('someUnidade');
    });
  });

  describe('delete', () => {
    it('calls SolicitationsRepository.delete and not throws error', async () => {
      solicitationsRepository.findOne.mockResolvedValue(mockSolicitation);

      expect(
        await solicitationsService.delete('someId', mockUser),
      ).toBeUndefined();
    });
  });
});
