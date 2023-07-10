import { NestFactory } from '@nestjs/core'
import { AppModule } from './api/app/module/app.module'
import { ValidationPipe } from '@nestjs/common'

async function main() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
main()
