import { EntityRepository, Repository } from 'typeorm';
import { CreateObservationDto } from '../dto/create-observation.dto';
import { Intern } from '../entities/intern.entity';
import { Observation } from '../entities/observations.entity';
import { Solicitation } from '../entities/solicitation.entity';

@EntityRepository(Observation)
export class ObservationsRepository extends Repository<Observation> {
  async createObservation(
    createObservationDto: CreateObservationDto,
    solicitation: Solicitation,
  ): Promise<Observation> {
    const { observation } = createObservationDto;

    const observationObject = this.create({
      observacao: observation,
      solicitacao: solicitation,
      resolved: false,
    });

    await this.save(observationObject);
    return observationObject;
  }
}
