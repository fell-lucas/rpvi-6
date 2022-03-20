import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { UnitsRepository } from './repositories/units.repository';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(UnitsRepository)
    private unitsRepository: UnitsRepository, // @Inject(forwardRef(() => ObservationsService)) // private observationsService: ObservationsService,
  ) {}

  async findAll(): Promise<Unit[]> {
    return await this.unitsRepository.find();
  }
}
