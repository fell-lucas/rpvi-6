import { EntityRepository, Repository } from 'typeorm';
import { InternshipData } from '../entities/internshipData.entity';

@EntityRepository(InternshipData)
export class InternshipDataRepository extends Repository<InternshipData> {}
