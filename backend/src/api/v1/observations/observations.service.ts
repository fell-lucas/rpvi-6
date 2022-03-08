import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '../auth/user-role.enum';
import { User } from '../auth/user.entity';
import { SolicitationStatus } from '../solicitations/entities/solicitation-status.enum';
import { SolicitationsRepository } from '../solicitations/repositories/solicitations.repository';
import { SolicitationsService } from '../solicitations/solicitations.service';
import { CreateObservationDto } from './dto/create-observation.dto';
import { ObservationsResponse } from './dto/observations-response.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { Observation } from './entities/observation.entity';
import { ObservationsRepository } from './repositories/observations.repository';

@Injectable()
export class ObservationsService {
  constructor(
    @InjectRepository(ObservationsRepository)
    private observationsRepository: ObservationsRepository,
    @InjectRepository(SolicitationsRepository)
    private solicitationsRepository: SolicitationsRepository,
    @Inject(forwardRef(() => SolicitationsService))
    private solicitationsService: SolicitationsService,
  ) {}

  async create(
    createObservationDto: CreateObservationDto,
    solicitationId: string,
    user: User,
  ): Promise<Observation> {
    if (user.role == UserRole.ALUNO)
      throw new UnauthorizedException('Alunos não podem criar observações');
    const solicitation = await this.solicitationsService.findOne(
      solicitationId,
      user,
    );

    const createdObservation = this.observationsRepository.createObservation(
      createObservationDto,
      solicitation,
      user,
    );

    await this.solicitationsService.update(
      solicitationId,
      { status: SolicitationStatus.CHANGE_REQUESTED },
      user,
    );

    return createdObservation;
  }

  async findAll(idSolicitation: string): Promise<ObservationsResponse> {
    let response: ObservationsResponse = new ObservationsResponse();
    response.observacoes = await this.observationsRepository.find({
      where: { solicitacao: idSolicitation },
      order: { created_at: 'ASC' },
    });
    return response;
  }

  /* istanbul ignore next */
  findOne(id: number) {
    return `This action returns a #${id} observation`;
  }

  async update(
    updateSolicitationDto: UpdateObservationDto,
    id: string,
    user: User,
  ): Promise<Observation> {
    const observation = await this.observationsRepository.findOne(id, {
      relations: ['solicitacao'],
    });

    if (!observation) {
      throw new NotFoundException(
        `Observaçao com o ID "${id}" não foi encontrada`,
      );
    }

    const { resolved } = updateSolicitationDto;
    observation.resolved = resolved;

    if (resolved) {
      let haveMore = false;
      let { observacoes } = await this.findAll(observation.solicitacao.id);

      observacoes.forEach((obs) => {
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

  /* istanbul ignore next */
  remove(id: number) {
    return `This action removes a #${id} observation`;
  }
}
