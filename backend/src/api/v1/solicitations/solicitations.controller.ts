import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SolicitationsService } from './solicitations.service';
import { CreateSolicitationDto } from './dto/create-solicitation.dto';
import { UpdateSolicitationDto } from './dto/update-solicitation.dto';
import { FindAllSolicitationsFilterDto } from './dto/find-solicitations-filter.dto';

@Controller('api/v1/solicitacoes')
export class SolicitationsController {
  constructor(private readonly solicitationsService: SolicitationsService) {}

  @Post()
  create(@Body() createSolicitationDto: CreateSolicitationDto) {
    return this.solicitationsService.create(createSolicitationDto);
  }

  @Get()
  findAll(@Query() filterDto: FindAllSolicitationsFilterDto) {
    return this.solicitationsService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSolicitationDto: UpdateSolicitationDto,
  ) {
    return this.solicitationsService.update(id, updateSolicitationDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.solicitationsService.delete(id);
  }
}
