import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../auth/user.entity';
import { Solicitation } from '../../solicitations/entities/solicitation.entity';
import { CreateObservationDto } from '../dto/create-observation.dto';
import { Observation } from '../entities/observation.entity';

@EntityRepository(Observation)
export class ObservationsRepository extends Repository<Observation> {
  async createObservation(
    createObservationDto: CreateObservationDto,
    solicitation: Solicitation,
    user: User,
  ): Promise<Observation> {
    const { observacao } = createObservationDto;

    const observationObject = this.create({
      observacao: observacao,
      solicitacao: solicitation,
      resolved: false,
      nomeAutor: user.name,
    });

    await this.save(observationObject);
    return observationObject;
  }
}
