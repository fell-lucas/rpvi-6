import { Module } from '@nestjs/common';
import { CampusesService } from './campuses.service';
import { CampusesController } from './campuses.controller';
import { CampusesRepository } from './repositories/campus.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CampusesRepository]), AuthModule],
  controllers: [CampusesController],
  providers: [CampusesService],
})
export class CampusesModule {}
