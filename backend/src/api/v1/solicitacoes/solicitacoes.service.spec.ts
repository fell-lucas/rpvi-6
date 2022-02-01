import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, createConnection, getConnection, Repository } from 'typeorm';
import { CreateSolicitacaoDto } from './dto/create-solicitacao.dto';
import { EstagiarioDto } from './dto/estagiario.dto';
import { InstituicaoDto } from './dto/instituicao.dto';
import { UnidadeConcedenteDto } from './dto/unidadeConcedente.dto';
import { UpdateSolicitacaoDto } from './dto/update-solicitacao.dto';
import { Estagiario } from './entities/estagiario.entity';
import { Instituicao } from './entities/instituicao.entity';
import { Solicitacao } from './entities/solicitacao.entity';
import { UnidadeConcedente } from './entities/unidadeConcedente.entity';
import { getMockForGet } from './mock/mock-solicitacao.handler';
import { MockType } from './mock/mock-type';
import { repositoryMockFactory } from './mock/repository-mock-factory';
import { SolicitacoesService } from './solicitacoes.service';

describe('SolicitacoesService', () => {
  let service: SolicitacoesService;
  let repositoryMock: MockType<Repository<Solicitacao>>;
  let solicitacaoExpected: Solicitacao;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SolicitacoesService,
        {
          provide: getRepositoryToken(Estagiario),
          useFactory: repositoryMockFactory
        },
        {
          provide: getRepositoryToken(Solicitacao),
          useFactory: repositoryMockFactory
        },
        {
          provide: getRepositoryToken(Instituicao),
          useFactory: repositoryMockFactory
        },
        {
          provide: getRepositoryToken(UnidadeConcedente),
          useFactory: repositoryMockFactory
        },
      ],
    }).compile();
    solicitacaoExpected = getMockForGet({});
    service = module.get<SolicitacoesService>(SolicitacoesService);
    repositoryMock = module.get(getRepositoryToken(Solicitacao));
  });

  describe('findAll', () => {
    it('should call findAll method', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll');

      repositoryMock.find.mockReturnValue(solicitacaoExpected);
      expect(await service.findAll()).toEqual(solicitacaoExpected);
      expect(findAllSpy).toHaveBeenCalledWith();
    });
  })

  describe('findOne', () => {
    it('should call findOne method with expected params', async () => {
      const findOneSpy = jest.spyOn(service, 'findOne');

      repositoryMock.findOne.mockReturnValue(solicitacaoExpected);
      expect(await service.findOne(1)).toEqual(solicitacaoExpected);
      expect(findOneSpy).toHaveBeenCalledWith(1);
    });
  })

  describe('create', () => {
    it('should call create method with expected params', async () => {
      const createSpy = jest.spyOn(service, 'create');
      const dto = new CreateSolicitacaoDto();

      repositoryMock.save.mockReturnValue(solicitacaoExpected);
      repositoryMock.create.mockReturnValue(solicitacaoExpected);
      expect(await service.create(dto)).toEqual(solicitacaoExpected);
      expect(createSpy).toHaveBeenCalledWith(dto);
    });
  })

  describe('update', () => {
    it('should call update method with expected params', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      const dto = new UpdateSolicitacaoDto();

      repositoryMock.findOne.mockReturnValue(solicitacaoExpected);
      repositoryMock.save.mockReturnValue(solicitacaoExpected);
      expect(await service.update(1, dto)).toEqual(solicitacaoExpected);
      expect(updateSpy).toHaveBeenCalledWith(1, dto);
    });

    it('should return undefined when not find solicitacao', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      const dto = new UpdateSolicitacaoDto();

      repositoryMock.findOne.mockReturnValue(undefined);
      repositoryMock.save.mockReturnValue(solicitacaoExpected);
      expect(await service.update(1, dto)).toEqual(undefined);
      expect(updateSpy).toHaveBeenCalledWith(1, dto);
    });

    it('should add id in dtos passed', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      const dto = new UpdateSolicitacaoDto();
      dto.estagiario = new EstagiarioDto();
      dto.instituicao = new InstituicaoDto();
      dto.unidadeConcedente = new UnidadeConcedenteDto();

      repositoryMock.findOne.mockReturnValue(undefined);
      repositoryMock.save.mockReturnValue(solicitacaoExpected);
      expect(await service.update(1, dto)).toEqual(undefined);
      expect(updateSpy).toHaveBeenCalledWith(1, dto);
    });
  })

  describe('remove', () => {
    it('should call remove method with expected params', async () => {
      const removeSpy = jest.spyOn(service, 'remove');

      repositoryMock.delete.mockReturnValue(solicitacaoExpected);
      repositoryMock.remove.mockReturnValue(solicitacaoExpected);
      repositoryMock.findOne.mockReturnValue(solicitacaoExpected);
      expect(await service.remove(1)).toStrictEqual({ deleted: solicitacaoExpected });
      expect(removeSpy).toHaveBeenCalledWith(1);
    });

    it('should return undefined when not find solicitacao', async () => {
      const removeSpy = jest.spyOn(service, 'remove');

      repositoryMock.remove.mockReturnValue(solicitacaoExpected);
      repositoryMock.delete.mockReturnValue(solicitacaoExpected);
      repositoryMock.findOne.mockReturnValue(undefined);
      expect(await service.remove(1)).toStrictEqual(undefined);
      expect(removeSpy).toHaveBeenCalledWith(1);
    });
  })
});
