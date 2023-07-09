import { Controller, Get } from '@nestjs/common'
import { AppService } from '../service/app.service'
import { Public } from 'src/api/decorator/custom.decorator'
@Public()
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): object {
    return this.appService.getHello()
  }
}
