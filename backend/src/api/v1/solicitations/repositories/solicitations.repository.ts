import { EntityRepository, Repository } from 'typeorm';
import { CreateSolicitationDto } from '../dto/create-solicitation.dto';
import { FindAllSolicitationsFilterDto } from '../dto/find-solicitations-filter.dto';
import { Institution } from '../entities/institution.entity';
import { Intern } from '../entities/intern.entity';
import { SolicitationStatus } from '../entities/solicitation-status.enum';
import { Solicitation } from '../entities/solicitation.entity';
import { Unit } from '../entities/unit.entity';

@EntityRepository(Solicitation)
export class SolicitationsRepository extends Repository<Solicitation> {
  async findAllSolicitations(
    filterDto: FindAllSolicitationsFilterDto,
  ): Promise<Solicitation[]> {
    const { status, search, page } = filterDto;
    const query = this.createQueryBuilder('solicitation');

    // query.where({ user });
    query.leftJoinAndSelect('solicitation.instituicao', 'institution');
    query.leftJoinAndSelect('solicitation.estagiario', 'intern');
    query.leftJoinAndSelect('solicitation.unidadeConcedente', 'unit');

    query.select([
      'solicitation.id',
      'intern.nome',
      'institution.razaoSocial',
      'unit.razaoSocial',
      'solicitation.status',
      'solicitation.updated_at',
    ]);
    if (status) {
      query.andWhere('solicitation.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(intern.nome) LIKE LOWER(:search) OR LOWER(institution.razaoSocial) LIKE LOWER(:search) OR LOWER(unit.razaoSocial) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    if (page) {
      const skipCount = page * 10 - 10;
      query.skip(skipCount);
    }

    query.take(10);

    query.orderBy('solicitation.updated_at', 'DESC');
    const tasks = await query.getMany();
    return tasks;
  }

  async createSolicitation(
    createSolicitationDto: CreateSolicitationDto,
  ): Promise<Solicitation> {
    const { estagiario, instituicao, unidadeConcedente } =
      createSolicitationDto;

    const solicitation = this.create({
      estagiario,
      instituicao,
      unidadeConcedente,
      status: SolicitationStatus.IN_PROGRESS,
    });

    await this.save(solicitation);
    return solicitation;
  }
}
