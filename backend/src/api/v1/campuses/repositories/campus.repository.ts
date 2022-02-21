import { EntityRepository, Repository } from 'typeorm';
import { Campus } from '../entities/campus.entity';

@EntityRepository(Campus)
export class CampusesRepository extends Repository<Campus> {}
