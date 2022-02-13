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
import { ObservationsRepository } from './repositories/observations.repository';
import { CreateObservationDto } from './dto/create-observation.dto';
import { Observation } from './entities/observations.entity';
import { UpdateObservationDto } from './dto/update-observation.dto';

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

  create(createSolicitationDto: CreateSolicitationDto): Promise<Solicitation> {
    return this.solicitationsRepository.createSolicitation(
      createSolicitationDto,
    );
  }

  async createObservation(
    createObservationDto: CreateObservationDto,
    solicitationId: string,
  ): Promise<Observation> {
    const solicitation = await this.solicitationsRepository.findOne(
      solicitationId,
    );

    return this.observationsRepository.createObservation(
      createObservationDto,
      solicitation,
    );
  }

  async updateObservation(
    updateSolicitationDto: UpdateObservationDto,
    id: string,
  ): Promise<Observation> {
    const observation = await this.observationsRepository.findOne(id);

    if (!observation) {
      throw new NotFoundException(
        `Solicitação com o ID "${id}" não foi encontrada`,
      );
    }

    const { resolved } = updateSolicitationDto;
    observation.resolved = resolved;

    await this.observationsRepository.save(observation);
    return observation;
  }

  async findAll(
    filterDto: FindAllSolicitationsFilterDto,
  ): Promise<Solicitation[]> {
    return await this.solicitationsRepository.findAllSolicitations(filterDto);
  }

  async findOne(id: string): Promise<Solicitation> {
    const found = await this.solicitationsRepository.findOne(id);

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
  ): Promise<Solicitation> {
    const solicitation = await this.findOne(id);

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

  async delete(id: string): Promise<void> {
    const solicitation = await this.findOne(id);
    await this.solicitationsRepository.delete({ id });

    await this.internsRepository.delete(solicitation.estagiario);
    await this.institutionsRepository.delete(solicitation.instituicao);
    await this.unitsRepository.delete(solicitation.unidadeConcedente);
  }
}
