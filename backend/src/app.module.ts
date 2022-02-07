import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitationsModule } from './api/v1/solicitations/solicitations.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), SolicitationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
