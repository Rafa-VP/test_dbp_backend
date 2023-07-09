import { Module } from '@nestjs/common'
import { AuthService } from '../service/auth.service'
import { AuthController } from '../controller/auth.controller'
import { UserModule } from '../../user/module/user.module'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../constants/auth.constants'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '../guard/auth.guard'

@Module({
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  exports: [AuthService]
})
export class AuthModule {}
