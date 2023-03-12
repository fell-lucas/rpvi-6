/* istanbul ignore file */
import { Controller, Get } from '@nestjs/common';
import { SeedingService } from './seeding.service';

@Controller()
export class AppController {
  constructor(private readonly seedingService: SeedingService) {}

  @Get('reset-database')
  async resetDatabase(): Promise<string> {
    await this.seedingService.clearAndSeed();
    return 'Database cleared and re-seeded.';
  }
}
