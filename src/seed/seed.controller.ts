import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

import { SeedService } from './seed.service';
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(ValidRoles.admin)
  async executeSeed() {
    return this.seedService.runSeed();
  }
}
