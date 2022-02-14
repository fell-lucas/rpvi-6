import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSolicitationDto } from './dto/create-solicitation.dto';
import { UpdateSolicitationDto } from './dto/update-solicitation.dto';
import { Solicitation } from './entities/solicitation.entity';
import { InstitutionsRepository } from './repositories/institution.repository';
import { InternsRepository } from './repositories/interns.repository';
import { UnitsRepository } from './repositories/units.repository';
import { SolicitationsRepository } from './repositories/solicitations.repository';
import { FindAllSolicitationsFilterDto } from './dto/find-solicitations-filter.dto';
import { ObservationsRepository } from './repositories/observations.repository';
import { CreateObservationDto } from './dto/create-observation.dto';
import { Observation } from './entities/observations.entity';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { SolicitationStatus } from './entities/solicitation-status.enum';
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
    private unitsRepository: UnitsRepository,
    @InjectRepository(ObservationsRepository)
    private observationsRepository: ObservationsRepository,
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

  async createObservation(
    createObservationDto: CreateObservationDto,
    solicitationId: string,
    user: User,
  ): Promise<Observation> {
    if (user.role == UserRole.ALUNO) throw new UnauthorizedException();
    const solicitation = await this.findOne(solicitationId);

    const createdObservation = this.observationsRepository.createObservation(
      createObservationDto,
      solicitation,
      user,
    );

    solicitation.status = SolicitationStatus.CHANGE_REQUESTED;
    await this.solicitationsRepository.save(solicitation);

    return createdObservation;
  }

  async updateObservation(
    updateSolicitationDto: UpdateObservationDto,
    id: string,
  ): Promise<Observation> {
    const observation = await this.observationsRepository.findOne(id, {
      relations: ['solicitacao'],
    });

    if (!observation) {
      throw new NotFoundException(
        `Solicitação com o ID "${id}" não foi encontrada`,
      );
    }

    const { resolved } = updateSolicitationDto;
    observation.resolved = resolved;

    if (resolved) {
      let haveMore = false;
      const solicitacao = await this.findOne(observation.solicitacao.id);

      solicitacao.observacoes.forEach((obs) => {
        if (!obs.resolved && obs.id !== observation.id) haveMore = true;
      });

      if (!haveMore)
        observation.solicitacao.status = SolicitationStatus.IN_REVIEW;

      await this.solicitationsRepository.save(observation.solicitacao);
    }

    await this.observationsRepository.save(observation);

    observation['solicitacao'] = undefined;
    return observation;
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
    } else {
      found = await this.solicitationsRepository.findOne(id);
    }

    if (!found) {
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
