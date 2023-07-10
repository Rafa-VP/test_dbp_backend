import { Controller, Get, Header } from '@nestjs/common'
import { AppService } from '../service/app.service'
import { Public } from '../../decorator/custom.decorator'

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @Header('Content-Type', 'application/json')
  getHello(): object {
    return this.appService.getHello()
  }
}
