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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SolicitationsRepository,
      InternsRepository,
      InstitutionsRepository,
      UnitsRepository,
    ]),
    AuthModule,
    forwardRef(() => ObservationsModule),
  ],
  controllers: [SolicitationsController],
  providers: [SolicitationsService],
  exports: [SolicitationsService],
})
export class SolicitationsModule {}
