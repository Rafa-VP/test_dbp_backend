import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../../user/service/user.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}
  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username)
    if (user?.password !== pass) {
      throw new UnauthorizedException(
        'The password you’ve entered is incorrect.'
      )
    }
    const payload = { sub: user._id, username: user.username }
    return {
      accessToken: await this.jwtService.signAsync(payload)
    }
  }
}
