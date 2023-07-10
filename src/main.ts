import { NestFactory } from '@nestjs/core'
import { AppModule } from './api/app/module/app.module'
import { ValidationPipe } from '@nestjs/common'
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerDocumentOptions
} from '@nestjs/swagger'
import { UserModule } from './api/user/module/user.module'
import { ClientModule } from './api/client/module/client.module'
import { AuthModule } from './api/auth/module/auth.module'

const SwaggerDocumentOptions: SwaggerDocumentOptions = {
  include: [UserModule, ClientModule, AuthModule, AppModule]
}

async function main() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle('Laboratory RVP')
    .setDescription('The Laboratory RVP API')
    .setVersion('1.0')
    .addBearerAuth()
    .setContact('Rafael VP', '', 'rafaelvak9@gmail.com')
    .build()

  const document = SwaggerModule.createDocument(
    app,
    config as any,
    SwaggerDocumentOptions
  )
  SwaggerModule.setup('docs', app, document)
  await app.listen(3000)
}
main()
