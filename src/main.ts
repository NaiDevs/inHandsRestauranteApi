import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Prefijo global para todos los controladores excepto health
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.ALL }],
  });

  // CORS si tienes frontend aparte
  app.enableCors();

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('inHands Restaurante API')
    .setDescription('Documentación de la API REST para inHands Restaurante')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // Render escanea el contenedor y necesita que escuches en process.env.PORT y 0.0.0.0
  const port = parseInt(process.env.PORT ?? '3000', 10);
  await app.listen(port, '0.0.0.0');
  console.log(`API running on port ${port}`);
}
bootstrap();
