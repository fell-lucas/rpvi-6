import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SolicitationsService } from './solicitations.service';
import { CreateSolicitationDto } from './dto/create-solicitation.dto';
import { UpdateSolicitationDto } from './dto/update-solicitation.dto';
import { FindAllSolicitationsFilterDto } from './dto/find-solicitations-filter.dto';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { SolicitationsResponse } from './dto/solicitations-response.dto';

@Controller('api/v1/solicitacoes')
@UseGuards(AuthGuard('jwt'))
export class SolicitationsController {
  constructor(private readonly solicitationsService: SolicitationsService) {}

  @Post()
  create(
    @Body() createSolicitationDto: CreateSolicitationDto,
    @GetUser() user: User,
  ) {
    return this.solicitationsService.create(createSolicitationDto, user);
  }

  @Post('observations/:id')
  createObservation(
    @Body() createObservationDto: CreateObservationDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.solicitationsService.createObservation(
      createObservationDto,
      id,
      user,
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
  findAll(
    @Query() filterDto: FindAllSolicitationsFilterDto,
    @GetUser() user: User,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<SolicitationsResponse> {
    limit = limit > 50 ? 50 : limit;
    page = page < 1 ? 1 : page;
    return this.solicitationsService.findAll(filterDto, user, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.solicitationsService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSolicitationDto: UpdateSolicitationDto,
    @GetUser() user: User,
  ) {
    return this.solicitationsService.update(id, updateSolicitationDto, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @GetUser() user: User) {
    return this.solicitationsService.delete(id, user);
  }
}
