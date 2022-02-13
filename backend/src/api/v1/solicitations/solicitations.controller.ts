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
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';

@Controller('api/v1/solicitacoes')
export class SolicitationsController {
  constructor(private readonly solicitationsService: SolicitationsService) {}

  @Post()
  create(@Body() createSolicitationDto: CreateSolicitationDto) {
    return this.solicitationsService.create(createSolicitationDto);
  }

  @Post('observations/:id')
  createObservation(
    @Body() createObservationDto: CreateObservationDto,
    @Param('id') id: string,
  ) {
    return this.solicitationsService.createObservation(
      createObservationDto,
      id,
    );
  }

  @Patch('observation/:id')
  updateObservation(
    @Body() updateObservationDto: UpdateObservationDto,
    @Param('id') id: string,
  ) {
    return this.solicitationsService.updateObservation(
      updateObservationDto,
      id,
    );
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
