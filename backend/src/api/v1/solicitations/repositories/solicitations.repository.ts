import { EntityRepository, Repository } from 'typeorm';
import { UserRole } from '../../auth/user-role.enum';
import { User } from '../../auth/user.entity';
import { CreateSolicitationDto } from '../dto/create-solicitation.dto';
import { FindAllSolicitationsFilterDto } from '../dto/find-solicitations-filter.dto';
import { SolicitationsResponse } from '../dto/solicitations-response.dto';
import { SolicitationStatus } from '../entities/solicitation-status.enum';
import { Solicitation } from '../entities/solicitation.entity';

@EntityRepository(Solicitation)
export class SolicitationsRepository extends Repository<Solicitation> {
  async findAllSolicitations(
    filterDto: FindAllSolicitationsFilterDto,
    user: User,
    page: number,
    limit: number,
  ): Promise<SolicitationsResponse> {
    const { status, search } = filterDto;
    const { role, campus } = user;
    let response: SolicitationsResponse = new SolicitationsResponse();
    let count;
    const query = this.createQueryBuilder('solicitation');

    query.leftJoinAndSelect('solicitation.instituicao', 'institution');
    query.leftJoinAndSelect('solicitation.estagiario', 'intern');
    query.leftJoinAndSelect('solicitation.unidadeConcedente', 'unit');

    switch (role) {
      case UserRole.ALUNO: {
        query.where({ user });
        break;
      }
      case UserRole.ORIENTADOR: {
        const userId = user.id;
        query.where('institution.orientadorEstagioId = :userId', { userId });
        break;
      }
      case UserRole.INTERFACE: {
        const campusId = campus.id;
        query.where('institution.campusId = :campusId', { campusId });
        break;
      }
    }

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

    const skipCount = page * limit - limit;
    query.skip(skipCount);
    query.take(limit);

    query.orderBy('solicitation.updated_at', 'DESC');
    [response.solicitations, count] = await query.getManyAndCount();
    response.nextPage = skipCount + limit >= count ? undefined : ++page;

    return response;
  }

  async createSolicitation(
    createSolicitationDto: CreateSolicitationDto,
    user: User,
  ): Promise<Solicitation> {
    const { estagiario, instituicao, unidadeConcedente, dadosEstagio } =
      createSolicitationDto;

    const solicitation = this.create({
      estagiario,
      instituicao,
      unidadeConcedente,
      status: SolicitationStatus.IN_REVIEW,
      user,
      dadosEstagio,
    });

    await this.save(solicitation);
    return solicitation;
  }
}
