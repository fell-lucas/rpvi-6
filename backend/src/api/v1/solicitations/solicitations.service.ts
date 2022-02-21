import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSolicitationDto } from './dto/create-solicitation.dto';
import { UpdateSolicitationDto } from './dto/update-solicitation.dto';
import { Solicitation } from './entities/solicitation.entity';
import { InstitutionsRepository } from './repositories/institution.repository';
import { InternsRepository } from './repositories/interns.repository';
import { UnitsRepository } from './repositories/units.repository';
import { SolicitationsRepository } from './repositories/solicitations.repository';
import { FindAllSolicitationsFilterDto } from './dto/find-solicitations-filter.dto';
import { User } from '../auth/user.entity';
import { SolicitationsResponse } from './dto/solicitations-response.dto';
import { UserRole } from '../auth/user-role.enum';

@Injectable()
export class SolicitationsService {
  constructor(
    @InjectRepository(SolicitationsRepository)
    private solicitationsRepository: SolicitationsRepository,
    @InjectRepository(InstitutionsRepository)
    private institutionsRepository: InstitutionsRepository,
    @InjectRepository(InternsRepository)
    private internsRepository: InternsRepository,
    @InjectRepository(UnitsRepository)
    private unitsRepository: UnitsRepository, // @Inject(forwardRef(() => ObservationsService)) // private observationsService: ObservationsService,
  ) {}

  create(
    createSolicitationDto: CreateSolicitationDto,
    user: User,
  ): Promise<Solicitation> {
    return this.solicitationsRepository.createSolicitation(
      createSolicitationDto,
      user,
    );
  }

  async findAll(
    filterDto: FindAllSolicitationsFilterDto,
    user: User,
    page: number,
    limit: number,
  ): Promise<SolicitationsResponse> {
    return await this.solicitationsRepository.findAllSolicitations(
      filterDto,
      user,
      page,
      limit,
    );
  }

  async findOne(id: string, user?: User): Promise<Solicitation> {
    let found;
    if (user && user.role == UserRole.ALUNO) {
      found = await this.solicitationsRepository.findOne(id, {
        where: { user },
      });
    } else if (user && user.role == UserRole.ORIENTADOR) {
      const userId = user.id;
      found = await this.solicitationsRepository.findOne({
        join: {
          alias: 'solicitacao',
          innerJoin: { instituicao: 'solicitacao.instituicao' },
        },
        where: (qb) => {
          qb.where({
            id: id,
          }).andWhere('instituicao.orientadorEstagioId = :userId', { userId }); // Filter related field
        },
      });
    } else if (user && user.role == UserRole.INTERFACE) {
      const campusId = user.campus.id;
      found = await this.solicitationsRepository.findOne({
        join: {
          alias: 'solicitacao',
          innerJoin: { instituicao: 'solicitacao.instituicao' },
        },
        where: (qb) => {
          qb.where({
            id: id,
          }).andWhere('instituicao.campusId = :campusId', { campusId }); // Filter related field
        },
      });
    }

    if (!found || found.length == 0) {
      throw new NotFoundException(
        `Solicitação com o ID "${id}" não foi encontrada`,
      );
    }
    return found;
  }

  async update(
    id: string,
    updateSolicitationDto: UpdateSolicitationDto,
    user: User,
  ): Promise<Solicitation> {
    const solicitation = await this.findOne(id, user);

    const { estagiario, instituicao, unidadeConcedente, status } =
      updateSolicitationDto;

    solicitation.estagiario = {
      ...solicitation.estagiario,
      ...estagiario,
    };
    solicitation.instituicao = {
      ...solicitation.instituicao,
      ...instituicao,
    };
    solicitation.unidadeConcedente = {
      ...solicitation.unidadeConcedente,
      ...unidadeConcedente,
    };
    solicitation.status = status;
    solicitation.observacoes = undefined;

    await this.solicitationsRepository.save(solicitation);
    return solicitation;
  }

  async delete(id: string, user: User): Promise<void> {
    const solicitation = await this.findOne(id, user);
    await this.solicitationsRepository.delete({ id });

    await this.internsRepository.delete(solicitation.estagiario);
    await this.institutionsRepository.delete(solicitation.instituicao);
    await this.unitsRepository.delete(solicitation.unidadeConcedente);
  }
}
