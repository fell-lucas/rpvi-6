import { Test, TestingModule } from '@nestjs/testing';
import { CampusesService } from './campuses.service';
import { CreateCampusDto } from './dto/create-campus.dto';
import { CampusesRepository } from './repositories/campuses.repository';

const mockCampusesRepository = () => ({
  create: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
});

describe('CampusesService', () => {
  let service: CampusesService;
  let campusesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampusesService,
        {
          provide: CampusesRepository,
          useFactory: mockCampusesRepository,
        },
      ],
    }).compile();

    service = module.get<CampusesService>(CampusesService);
    campusesRepository = module.get(CampusesRepository);
  });

  describe('create', () => {
    it('calls create and returns the result', async () => {
      campusesRepository.create.mockResolvedValue('someValue');
      campusesRepository.save.mockResolvedValue('someValue');
      const result = await service.create({
        cidade: 'Alegrete',
      } as CreateCampusDto);
      expect(result).toEqual('someValue');
    });
  });

  describe('findAll', () => {
    it('calls findAll and returns the result', async () => {
      campusesRepository.find.mockResolvedValue(['someValue']);
      const result = await service.findAll();
      expect(result).toEqual(['someValue']);
    });
  });
});
