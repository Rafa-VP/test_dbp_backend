import { NestFactory } from '@nestjs/core'
import { AppModule } from './api/app/module/app.module'
import { ValidationPipe } from '@nestjs/common'

async function main() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({ origin: '*', methods: ['POST', 'PUT', 'DELETE', 'GET'] })
  await app.listen(3000)
}
main()
