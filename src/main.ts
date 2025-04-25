import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('Time monitoring')
    .setDescription(
      `Track your time like a boss ⏱️💼—see where it all goes, slay your day, and stop missing deadlines.  
No fluff, just facts. Your time, finally under control. 🔥📊`,
    )
    .setVersion('0.1')
    .addTag('time tracker')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api/docs', app, document)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
