import { EntityRepository, Repository } from 'typeorm';
import { Institution } from '../entities/institution.entity';

@EntityRepository(Institution)
export class InstitutionsRepository extends Repository<Institution> {}
