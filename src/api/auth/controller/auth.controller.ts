import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common'
import { AuthService } from '../service/auth.service'
import { Response } from 'express'
import { SignInDto } from '../dto/signIn.dto'
import { Public } from 'src/api/decorator/custom.decorator'

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    try {
      const response = await this.authService.signIn(
        signInDto.username,
        signInDto.password
      )
      return res.status(HttpStatus.OK).json(response)
    } catch (err: any) {
      return res.status(err.status).json(err.response)
    }
  }
}
