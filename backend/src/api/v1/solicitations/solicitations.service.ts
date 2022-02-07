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
  ) {}

  create(createSolicitationDto: CreateSolicitationDto): Promise<Solicitation> {
    return this.solicitationsRepository.createSolicitation(
      createSolicitationDto,
    );
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
