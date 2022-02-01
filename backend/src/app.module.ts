import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitacoesModule } from './api/v1/solicitacoes/solicitacoes.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    SolicitacoesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
