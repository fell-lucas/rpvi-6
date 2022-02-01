import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateSolicitacaoDto } from './dto/create-solicitacao.dto';
import { UpdateSolicitacaoDto } from './dto/update-solicitacao.dto';
import { Estagiario } from './entities/estagiario.entity';
import { Instituicao } from './entities/instituicao.entity';
import { Solicitacao } from './entities/solicitacao.entity';
import { UnidadeConcedente } from './entities/unidadeConcedente.entity';

@Injectable()
export class SolicitacoesService {
  constructor(
    @InjectRepository(Solicitacao)
    private solicitacaoRepository: Repository<Solicitacao>,
    @InjectRepository(Estagiario)
    private estagiarioRepository: Repository<Estagiario>,
    @InjectRepository(Instituicao)
    private instituicaoRepository: Repository<Instituicao>,
    @InjectRepository(UnidadeConcedente)
    private unidadeRepository: Repository<UnidadeConcedente>,
  ) { }

  async create(createSolicitacoeDto: CreateSolicitacaoDto) {
    const novaSolicitacao = this.solicitacaoRepository.create(
      createSolicitacoeDto
    );
    return this.solicitacaoRepository.save(novaSolicitacao);
  }

  async findAll() {
    return await this.solicitacaoRepository.find({ relations: ["estagiario", "instituicao", "unidadeConcedente"] });
  }

  async findOne(id: number) {
    return await this.solicitacaoRepository.findOne({
      where: {
        id: id,
      },
      relations: ["estagiario", "instituicao", "unidadeConcedente"],
    });
  }

  async update(id: number, updateSolicitacaoDto: UpdateSolicitacaoDto) {
    const solicitacao = await this.findOne(id);
    if (solicitacao == undefined) {
      return undefined;
    }
    updateSolicitacaoDto['estagiario'] ? updateSolicitacaoDto['estagiario']['id'] = solicitacao.estagiario.id : undefined;
    updateSolicitacaoDto['instituicao'] ? updateSolicitacaoDto['instituicao']['id'] = solicitacao.instituicao.id : undefined;
    updateSolicitacaoDto['unidadeConcedente'] ? updateSolicitacaoDto['unidadeConcedente']['id'] = solicitacao.unidadeConcedente.id : undefined;
    await this.solicitacaoRepository.save({ ...solicitacao, ...updateSolicitacaoDto });
    return await this.findOne(id);
  }

  async remove(id: number) {
    const solicitacao = await this.findOne(id);
    if (solicitacao == undefined) {
      return undefined;
    }

    const estagiario = await this.estagiarioRepository.findOne({ where: { id: solicitacao.estagiario.id } });
    const instituicao = await this.instituicaoRepository.findOne({ where: { id: solicitacao.instituicao.id } });
    const unidadeConcedente = await this.unidadeRepository.findOne({ where: { id: solicitacao.unidadeConcedente.id } });

    await this.estagiarioRepository.remove(estagiario)
    await this.instituicaoRepository.remove(instituicao)
    await this.unidadeRepository.remove(unidadeConcedente)
    await this.solicitacaoRepository.delete({ id });

    return { deleted: solicitacao };
  }
}
