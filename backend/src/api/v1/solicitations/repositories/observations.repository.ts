import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../auth/user.entity';
import { CreateObservationDto } from '../dto/create-observation.dto';
import { Observation } from '../entities/observations.entity';
import { Solicitation } from '../entities/solicitation.entity';

@EntityRepository(Observation)
export class ObservationsRepository extends Repository<Observation> {
  async createObservation(
    createObservationDto: CreateObservationDto,
    solicitation: Solicitation,
    user: User,
  ): Promise<Observation> {
    const { observation } = createObservationDto;

    const observationObject = this.create({
      observacao: observation,
      solicitacao: solicitation,
      resolved: false,
      nomeAutor: user.name,
    });

    await this.save(observationObject);
    return observationObject;
  }
}
