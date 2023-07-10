import { Body, Controller, Post, Res, HttpStatus, Header } from '@nestjs/common'
import { AuthService } from '../service/auth.service'
import { Response } from 'express'
import { SignInDto } from '../dto/signIn.dto'
import { Public } from '../../decorator/custom.decorator'
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger'
import { User } from 'src/api/user/schema/user.schema'

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  @ApiOkResponse({
    schema: {
      example: {
        username: 'admin',
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGFhZjM3MTYwMGMwNThjZWUxMmY3MzIiLCJ1c2VybmFtZSI6InJhYWZhdnAiLCJpYXQiOjE2ODkwMTU5NjYsImV4cCI6MTY4OTAxOTU2Nn0.5_UiM3Cbn4ymY2j1SkhY4wfpp1h-KWb9GMlINm8kagQ'
      }
    }
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        message: 'The password you’ve entered is incorrect.',
        error: 'Unauthorized',
        statusCode: 401
      }
    }
  })
  @ApiNotFoundResponse({
    schema: {
      example: {
        message: 'User not found!',
        error: 'Not Found',
        statusCode: 404
      }
    }
  })
  @ApiBody({
    schema: {
      example: {
        username: 'admin',
        password: 'systemdata'
      },
      type: User.name
    }
  })
  @Header('Content-Type', 'application/json')
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
