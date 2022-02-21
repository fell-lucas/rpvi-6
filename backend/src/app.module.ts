/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/v1/auth/auth.module';
import { CampusesModule } from './api/v1/campuses/campuses.module';
import { ObservationsModule } from './api/v1/observations/observations.module';
import { SolicitationsModule } from './api/v1/solicitations/solicitations.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SolicitationsModule,
    AuthModule,
    ObservationsModule,
    CampusesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
