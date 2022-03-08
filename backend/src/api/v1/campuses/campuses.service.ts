import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { CampusesRepository } from './repositories/campuses.repository';

@Injectable()
export class CampusesService {
  constructor(
    @InjectRepository(CampusesRepository)
    private campusesRepository: CampusesRepository,
  ) {}

  async create(createCampusDto: CreateCampusDto) {
    const campus = this.campusesRepository.create({
      cidade: createCampusDto.cidade,
    });

    return await this.campusesRepository.save(campus);
  }

  async findAll() {
    return await this.campusesRepository.find({
      order: { cidade: 'ASC' },
    });
  }

  /* istanbul ignore next */
  findOne(id: number) {
    return `This action returns a #${id} campus`;
  }

  /* istanbul ignore next */
  update(id: number, updateCampusDto: UpdateCampusDto) {
    return `This action updates a #${id} campus`;
  }

  /* istanbul ignore next */
  remove(id: number) {
    return `This action removes a #${id} campus`;
  }
}
