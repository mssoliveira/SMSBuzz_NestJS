import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configSwagger = new DocumentBuilder()
    .setTitle('Send SMS and Voice')
    .setDescription(
      'A API foi construida utilizando tecnologias atuais, provendo segurança e padronização.',
    )
    .setVersion(process.env.VERSION_API)
    .build();
  const docSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, docSwagger);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
