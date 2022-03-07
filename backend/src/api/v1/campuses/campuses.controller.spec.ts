import { Test, TestingModule } from '@nestjs/testing';
import { CampusesController } from './campuses.controller';
import { CampusesService } from './campuses.service';
import { CreateCampusDto } from './dto/create-campus.dto';
import { CampusesRepository } from './repositories/campuses.repository';

const mockCampusesRepository = () => ({});

describe('CampusesController', () => {
  let controller: CampusesController;
  let service: CampusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampusesController],
      providers: [
        CampusesService,
        {
          provide: CampusesRepository,
          useFactory: mockCampusesRepository,
        },
      ],
    }).compile();

    controller = module.get<CampusesController>(CampusesController);
    service = module.get<CampusesService>(CampusesService);
  });

  describe('findAll', () => {
    it('findAll should return expected value', async () => {
      service.findAll = jest.fn().mockResolvedValue(['someValue']);

      const result = await controller.findAll();

      expect(result).toEqual(['someValue']);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('create should return expected value', async () => {
      service.create = jest.fn().mockResolvedValue({});

      const result = await controller.create({} as CreateCampusDto);

      expect(result).toStrictEqual({});
      expect(service.create).toHaveBeenCalled();
      expect(service.create).toHaveBeenCalledWith({});
    });
  });
});
