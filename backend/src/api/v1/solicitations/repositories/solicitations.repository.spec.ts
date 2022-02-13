import { Test, TestingModule } from '@nestjs/testing';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateSolicitationDto } from '../dto/create-solicitation.dto';
import { SolicitationStatus } from '../entities/solicitation-status.enum';
import { Solicitation } from '../entities/solicitation.entity';
import { getMockForGet } from '../mock/mock-solicitation.handler';
import { SolicitationsRepository } from './solicitations.repository';

describe('Solicitations Repository', () => {
  let solicitationsRepository: SolicitationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolicitationsRepository],
    }).compile();

    solicitationsRepository = module.get(SolicitationsRepository);
  });

  describe('findAllSolicitations', () => {
    it('calls SolicitationsRepository.findAllSolicitations and returns the result', async () => {
      const mockSolicitation = getMockForGet({});
      jest
        .spyOn(Repository.prototype, 'createQueryBuilder')
        .mockReturnValue(SelectQueryBuilder.prototype);
      jest.spyOn(SelectQueryBuilder.prototype, 'andWhere').mockReturnThis();
      jest.spyOn(SelectQueryBuilder.prototype, 'select').mockReturnThis();
      jest.spyOn(SelectQueryBuilder.prototype, 'take').mockReturnThis();
      jest.spyOn(SelectQueryBuilder.prototype, 'skip').mockReturnThis();
      jest.spyOn(SelectQueryBuilder.prototype, 'orderBy').mockReturnThis();
      jest
        .spyOn(SelectQueryBuilder.prototype, 'leftJoinAndSelect')
        .mockReturnThis(); // the same goes for setParameter, skip and take methods  ;
      jest
        .spyOn(SelectQueryBuilder.prototype, 'getMany')
        .mockResolvedValue([mockSolicitation]);

      const foundSolicitations =
        await solicitationsRepository.findAllSolicitations({
          search: 'SomeSearch',
          status: SolicitationStatus.APPROVED,
          page: 1,
        });
      expect(foundSolicitations).toEqual([mockSolicitation]);
    });
  });

  describe('createSolicitation', () => {
    it('calls SolicitationsRepository.createSolicitation and returns the result', async () => {
      const mockSolicitation = getMockForGet({});
      // the same goes for setParameter, skip and take methods  ;
      // const findOneSpy = jest
      //   .spyOn(solicitationsRepository, 'create')
      //   .mockResolvedValue(mockSolicitation as Solicitation);
      jest
        .spyOn(Repository.prototype, 'create')
        .mockReturnValue('createdSolicitation');
      jest.spyOn(Repository.prototype, 'save').mockReturnThis();

      const foundSolicitations =
        await solicitationsRepository.createSolicitation(
          mockSolicitation as CreateSolicitationDto,
        );
      expect(foundSolicitations).toEqual('createdSolicitation');
    });
  });
});
