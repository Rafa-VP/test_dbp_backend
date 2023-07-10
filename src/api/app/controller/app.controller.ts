import { Controller, Get, Header } from '@nestjs/common'
import { AppService } from '../service/app.service'
import { Public } from '../../decorator/custom.decorator'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

@ApiTags('Hello Word :)')
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @ApiOkResponse({ description: 'Returns a friendly Hello World ;)' })
  @Header('Content-Type', 'application/json')
  getHello(): object {
    return this.appService.getHello()
  }
}
