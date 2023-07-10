import { NestFactory } from '@nestjs/core'
import { AppModule } from './api/app/module/app.module'
import { ValidationPipe } from '@nestjs/common'

async function main() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: ['GET', 'PUT', 'POST', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
main()
