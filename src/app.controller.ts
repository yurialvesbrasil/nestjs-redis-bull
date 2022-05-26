import { CACHE_MANAGER, Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('reset')
  resetCache() {
    const varToClear = 'tweets-offset';
    this.cacheManager.del(varToClear, () => console.log('clear done'));
  }
}
