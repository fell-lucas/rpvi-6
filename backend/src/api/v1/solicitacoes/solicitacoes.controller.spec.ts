import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateSolicitacaoDto } from './dto/create-solicitacao.dto';
import { UpdateSolicitacaoDto } from './dto/update-solicitacao.dto';
import { Estagiario } from './entities/estagiario.entity';
import { Instituicao } from './entities/instituicao.entity';
import { Solicitacao } from './entities/solicitacao.entity';
import { UnidadeConcedente } from './entities/unidadeConcedente.entity';
import { getMockForGet } from './mock/mock-solicitacao.handler';
import { SolicitacoesController } from './solicitacoes.controller';
import { SolicitacoesService } from './solicitacoes.service';

describe('SolicitacoesController', () => {
  let controller: SolicitacoesController;
  let service: SolicitacoesService;
  let solicitacaoExpected: Solicitacao;
  let internalServerError;
  let notFoundError;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitacoesController],
      providers: [
        SolicitacoesService,
        {
          provide: getRepositoryToken(Estagiario),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Solicitacao),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Instituicao),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UnidadeConcedente),
          useClass: Repository,
        },
      ],
    }).compile();

    solicitacaoExpected = getMockForGet({});
    controller = module.get<SolicitacoesController>(SolicitacoesController);
    service = module.get<SolicitacoesService>(SolicitacoesService);

    internalServerError = new HttpException(
      'INTERNAL SERVER ERROR',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    notFoundError = new HttpException(
      'NOT FOUND',
      HttpStatus.NOT_FOUND,
    );
  });

  describe('findAll', () => {
    it('findAll should return expected value', async () => {
      service.findAll = jest.fn().mockResolvedValue(solicitacaoExpected);

      const result = await controller.findAll();

      expect(result).toBe(solicitacaoExpected);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('findAll should return empty list when not found', async () => {
      service.findAll = jest.fn().mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toStrictEqual([]);
    });

    it('findAll should return 500 when error', async () => {
      service.findAll = jest.fn().mockRejectedValue(new Error());

      await expect(async () => {
        await controller.findAll();
      }).rejects.toEqual(internalServerError);
    });
  })

  describe('findOne', () => {
    it('findOne should return expected value', async () => {
      service.findOne = jest.fn().mockResolvedValue(solicitacaoExpected);

      const result = await controller.findOne("1");

      expect(result).toBe(solicitacaoExpected);
      expect(service.findOne).toHaveBeenCalled();
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('findOne should return 500 when error', async () => {
      service.findOne = jest.fn().mockRejectedValue(new Error());

      await expect(async () => {
        await controller.findOne("1");
      }).rejects.toEqual(internalServerError);
    });

    it('findOne should return 404 when not found', async () => {
      service.findOne = jest.fn().mockResolvedValue(undefined);

      await expect(async () => {
        await controller.findOne("1");
      }).rejects.toEqual(notFoundError);
    });
  })

  describe('create', () => {
    it('create should return expected value', async () => {
      service.create = jest.fn().mockResolvedValue(solicitacaoExpected);

      const result = await controller.create(solicitacaoExpected as CreateSolicitacaoDto);

      expect(result).toBe(solicitacaoExpected);
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledWith(solicitacaoExpected as CreateSolicitacaoDto);
    });

    it('create should return 500 when error', async () => {
      service.create = jest.fn().mockRejectedValue(new Error());

      await expect(async () => {
        await controller.create(solicitacaoExpected as CreateSolicitacaoDto)
      }).rejects.toEqual(internalServerError);
    });
  })

  describe('update', () => {
    it('update should return expected changed value', async () => {
      var solicitacaoUpdated = solicitacaoExpected;
      solicitacaoUpdated.estagiario.nome = "Joao";
      service.update = jest.fn().mockResolvedValue(solicitacaoUpdated);

      const result = await controller.update("1", solicitacaoUpdated as UpdateSolicitacaoDto);

      expect(result).toBe(solicitacaoUpdated);
      expect(result.estagiario.nome).toBe("Joao");
      expect(service.update).toHaveBeenCalled();
      expect(service.update).toHaveBeenCalledWith(1, solicitacaoUpdated as UpdateSolicitacaoDto);
    });

    it('update should return 500 when error', async () => {
      var solicitacaoUpdated = solicitacaoExpected;
      solicitacaoUpdated.estagiario.nome = "Joao";
      service.update = jest.fn().mockRejectedValue(new Error());

      await expect(async () => {
        await controller.update("1", solicitacaoUpdated as UpdateSolicitacaoDto);
      }).rejects.toEqual(internalServerError);
    });

    it('update should return 404 when not found', async () => {
      var solicitacaoUpdated = solicitacaoExpected;
      solicitacaoUpdated.estagiario.nome = "Joao";
      service.update = jest.fn().mockResolvedValue(undefined);

      await expect(async () => {
        await controller.update("1", solicitacaoUpdated as UpdateSolicitacaoDto);
      }).rejects.toEqual(notFoundError);
    });
  })

  describe('remove', () => {
    it('remove should return expected deleted value', async () => {
      service.remove = jest.fn().mockResolvedValue({ deleted: solicitacaoExpected });

      const result = await controller.remove("1");

      expect(result).toStrictEqual({ deleted: solicitacaoExpected });
      expect(service.remove).toHaveBeenCalled();
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('remove should return 500 when error', async () => {
      service.remove = jest.fn().mockRejectedValue(new Error());

      await expect(async () => {
        await controller.remove("1");
      }).rejects.toEqual(internalServerError);
    });

    it('remove should return 404 when not found', async () => {
      service.remove = jest.fn().mockResolvedValue(undefined);

      await expect(async () => {
        await controller.remove("1");
      }).rejects.toEqual(notFoundError);
    });
  })
});
