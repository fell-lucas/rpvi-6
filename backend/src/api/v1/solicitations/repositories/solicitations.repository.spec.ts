import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { UserRole } from '../../auth/user-role.enum';
import { User } from '../../auth/user.entity';
import { CreateSolicitationDto } from '../dto/create-solicitation.dto';
import { SolicitationStatus } from '../entities/solicitation-status.enum';
import { Solicitation } from '../entities/solicitation.entity';
import { MockSolicitation } from '../mock/mock-solicitation.handler';
import { MockUser } from '../mock/mock-user.handler';
import { SolicitationsRepository } from './solicitations.repository';

describe('Solicitations Repository', () => {
  let solicitationsRepository: SolicitationsRepository;
  let mockUser: User;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [SolicitationsRepository],
    }).compile();

    solicitationsRepository = module.get(SolicitationsRepository);
    mockUser = MockUser({});
  });

  describe('findAllSolicitations', () => {
    it('calls SolicitationsRepository.findAllSolicitations and returns the result', async () => {
      const mockSolicitation = MockSolicitation({});
      jest
        .spyOn(Repository.prototype, 'createQueryBuilder')
        .mockReturnValue(SelectQueryBuilder.prototype);
      jest.spyOn(SelectQueryBuilder.prototype, 'where').mockReturnThis();
      jest.spyOn(SelectQueryBuilder.prototype, 'andWhere').mockReturnThis();
      jest.spyOn(SelectQueryBuilder.prototype, 'select').mockReturnThis();
      jest.spyOn(SelectQueryBuilder.prototype, 'take').mockReturnThis();
      jest.spyOn(SelectQueryBuilder.prototype, 'skip').mockReturnThis();
      jest.spyOn(SelectQueryBuilder.prototype, 'orderBy').mockReturnThis();
      jest
        .spyOn(SelectQueryBuilder.prototype, 'leftJoinAndSelect')
        .mockReturnThis(); // the same goes for setParameter, skip and take methods  ;
      jest
        .spyOn(SelectQueryBuilder.prototype, 'getManyAndCount')
        .mockResolvedValue([[mockSolicitation], 10]);

      const foundSolicitations =
        await solicitationsRepository.findAllSolicitations(
          {
            search: 'SomeSearch',
            status: SolicitationStatus.APPROVED,
          },
          mockUser,
          1,
          1,
        );
      expect(foundSolicitations).toEqual({
        nextPage: 2,
        solicitations: [mockSolicitation],
      });
    });

    it('calls SolicitationsRepository.findAllSolicitations for INTERFACE and returns the result', async () => {
      const mockSolicitation = MockSolicitation({});
      jest
        .spyOn(Repository.prototype, 'createQueryBuilder')
        .mockReturnValue(SelectQueryBuilder.prototype);
      jest.spyOn(SelectQueryBuilder.prototype, 'where').mockReturnThis();
      jest.spyOn(SelectQueryBuilder.prototype, 'andWhere').mockReturnThis();
      jest.spyOn(SelectQueryBuilder.prototype, 'select').mockReturnThis();
      jest.spyOn(SelectQueryBuilder.prototype, 'take').mockReturnThis();
      jest.spyOn(SelectQueryBuilder.prototype, 'skip').mockReturnThis();
      jest.spyOn(SelectQueryBuilder.prototype, 'orderBy').mockReturnThis();
      jest
        .spyOn(SelectQueryBuilder.prototype, 'leftJoinAndSelect')
        .mockReturnThis(); // the same goes for setParameter, skip and take methods  ;
      jest
        .spyOn(SelectQueryBuilder.prototype, 'getManyAndCount')
        .mockResolvedValue([[mockSolicitation], 10]);

      mockUser.role = UserRole.INTERFACE;

      const foundSolicitations =
        await solicitationsRepository.findAllSolicitations(
          {
            search: 'SomeSearch',
            status: SolicitationStatus.APPROVED,
          },
          mockUser,
          1,
          1,
        );
      expect(foundSolicitations).toEqual({
        nextPage: 2,
        solicitations: [mockSolicitation],
      });
    });
  });

  describe('createSolicitation', () => {
    it('calls SolicitationsRepository.createSolicitation and returns the result', async () => {
      const mockSolicitation = MockSolicitation({});
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
          mockUser,
        );
      expect(foundSolicitations).toEqual('createdSolicitation');
    });
  });
});
