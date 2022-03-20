import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Unit } from './entities/unit.entity';
import { UnitsService } from './units.service';

@Controller('api/v1/unidades')
@UseGuards(AuthGuard('jwt'))
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get()
  findAll(): Promise<Unit[]> {
    return this.unitsService.findAll();
  }
}
