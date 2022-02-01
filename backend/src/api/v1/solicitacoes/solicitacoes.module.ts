import { Module } from '@nestjs/common';
import { SolicitacoesService } from './solicitacoes.service';
import { SolicitacoesController } from './solicitacoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitacao } from './entities/solicitacao.entity';
import { Estagiario } from './entities/estagiario.entity';
import { UnidadeConcedente } from './entities/unidadeConcedente.entity';
import { Instituicao } from './entities/instituicao.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Solicitacao, Estagiario, UnidadeConcedente, Instituicao]),
  ],
  controllers: [SolicitacoesController],
  providers: [SolicitacoesService]
})
export class SolicitacoesModule { }
