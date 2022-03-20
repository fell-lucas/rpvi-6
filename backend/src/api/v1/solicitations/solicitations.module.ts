/* istanbul ignore file */
import { forwardRef, Module } from '@nestjs/common';
import { SolicitationsService } from './solicitations.service';
import { SolicitationsController } from './solicitations.controller';
import { InternsRepository } from './repositories/interns.repository';
import { InstitutionsRepository } from './repositories/institution.repository';
import { UnitsRepository } from './repositories/units.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitationsRepository } from './repositories/solicitations.repository';
import { AuthModule } from '../auth/auth.module';
import { ObservationsModule } from '../observations/observations.module';
import { InternshipDataRepository } from './repositories/internshipData.repository';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SolicitationsRepository,
      InternsRepository,
      InstitutionsRepository,
      UnitsRepository,
      InternshipDataRepository,
    ]),
    AuthModule,
    forwardRef(() => ObservationsModule),
  ],
  controllers: [SolicitationsController, UnitsController],
  providers: [SolicitationsService, UnitsService],
  exports: [SolicitationsService],
})
export class SolicitationsModule {}
