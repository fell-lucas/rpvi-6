import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotImplementedException,
} from '@nestjs/common';
import { ObservationsService } from './observations.service';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ObservationsResponse } from './dto/observations-response.dto';

@Controller('api/v1/observacoes')
@UseGuards(AuthGuard('jwt'))
export class ObservationsController {
  constructor(private readonly observationsService: ObservationsService) {}

  @Post(':id')
  create(
    @Body() createObservationDto: CreateObservationDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.observationsService.create(createObservationDto, id, user);
  }

  @Patch(':id')
  update(
    @Body() updateObservationDto: UpdateObservationDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.observationsService.update(updateObservationDto, id, user);
  }

  @Get('/solicitacao/:id')
  findAll(@Param('id') idSolicitation: string): Promise<ObservationsResponse> {
    return this.observationsService.findAll(idSolicitation);
  }

  /* istanbul ignore next */
  @Get(':id')
  findOne(@Param('id') id: string) {
    throw new NotImplementedException();
  }

  /* istanbul ignore next */
  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new NotImplementedException();
  }
}
