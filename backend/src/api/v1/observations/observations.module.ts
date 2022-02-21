import { forwardRef, Module } from '@nestjs/common';
import { ObservationsService } from './observations.service';
import { ObservationsController } from './observations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObservationsRepository } from './repositories/observations.repository';
import { SolicitationsRepository } from '../solicitations/repositories/solicitations.repository';
import { AuthModule } from '../auth/auth.module';
import { SolicitationsModule } from '../solicitations/solicitations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SolicitationsRepository, ObservationsRepository]),
    AuthModule,
    forwardRef(() => SolicitationsModule),
  ],
  controllers: [ObservationsController],
  providers: [ObservationsService],
  exports: [ObservationsService],
})
export class ObservationsModule {}
