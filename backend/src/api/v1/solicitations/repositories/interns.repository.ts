import { EntityRepository, Repository } from 'typeorm';
import { Intern } from '../entities/intern.entity';

@EntityRepository(Intern)
export class InternsRepository extends Repository<Intern> {}
