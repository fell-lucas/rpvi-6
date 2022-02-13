/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { SolicitationsService } from './solicitations.service';
import { SolicitationsController } from './solicitations.controller';
import { InternsRepository } from './repositories/interns.repository';
import { InstitutionsRepository } from './repositories/institution.repository';
import { UnitsRepository } from './repositories/units.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitationsRepository } from './repositories/solicitations.repository';
import { ObservationsRepository } from './repositories/observations.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SolicitationsRepository,
      InternsRepository,
      InstitutionsRepository,
      UnitsRepository,
      ObservationsRepository,
    ]),
  ],
  controllers: [SolicitationsController],
  providers: [SolicitationsService],
})
export class SolicitationsModule {}
