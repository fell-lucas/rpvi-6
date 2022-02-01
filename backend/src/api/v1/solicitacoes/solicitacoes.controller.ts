import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { SolicitacoesService } from './solicitacoes.service';
import { CreateSolicitacaoDto } from './dto/create-solicitacao.dto';
import { UpdateSolicitacaoDto } from './dto/update-solicitacao.dto';

@Controller('api/v1/solicitacoes')
export class SolicitacoesController {
  constructor(private readonly solicitacoesService: SolicitacoesService) { }

  @Post()
  async create(@Body() createSolicitacaoDto: CreateSolicitacaoDto) {
    try {
      return await this.solicitacoesService.create(createSolicitacaoDto);
    } catch (error) {
      throw new HttpException(
        'INTERNAL SERVER ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.solicitacoesService.findAll();
    } catch (error) {
      throw new HttpException(
        'INTERNAL SERVER ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let result;
    try {
      result = await this.solicitacoesService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        'INTERNAL SERVER ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
    if (result === undefined) {
      throw new HttpException(
        'NOT FOUND',
        HttpStatus.NOT_FOUND,
      )
    }
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSolicitacaoDto: UpdateSolicitacaoDto) {
    let result;
    try {
      result = await this.solicitacoesService.update(+id, updateSolicitacaoDto);
    } catch (error) {
      throw new HttpException(
        'INTERNAL SERVER ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
    if (result === undefined) {
      throw new HttpException(
        'NOT FOUND',
        HttpStatus.NOT_FOUND,
      )
    }
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let result;
    try {
      result = await this.solicitacoesService.remove(+id);
    } catch (error) {
      throw new HttpException(
        'INTERNAL SERVER ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
    if (result === undefined) {
      throw new HttpException(
        'NOT FOUND',
        HttpStatus.NOT_FOUND,
      )
    }
    return result;
  }
}
