import { Module } from '@nestjs/common'
import { AppController } from '../controller/app.controller'
import { AppService } from '../service/app.service'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ClientModule } from '../../client/module/client.module'
import { AuthModule } from '../../auth/module/auth.module'
import { UserModule } from '../../user/module/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URL, {
      auth: { username: process.env.DB_USER, password: process.env.DB_PASS },
      autoIndex: true
    }),
    ClientModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
