import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { w3cwebsocket } from 'websocket';
globalThis.WebSocket = w3cwebsocket;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const MicroservicePort = process.env.MICROSERVICE_PORT
    ? process.env.MICROSERVICE_PORT
    : 4200;

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: MicroservicePort, retryAttempts: 5, retryDelay: 3000 },
  });

  const moduleRoutingPath = `/${process.env.MODULE}`;
  app.setGlobalPrefix('api' + moduleRoutingPath);

  // const cors: string[] = process.env.CORS.split(',');
  // app.enableCors({
  //   origin: cors,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  // });

  const config = new DocumentBuilder()
    .setTitle('Handigo API')
    .setDescription('The Handigo API description')
    .setVersion('1.0')
    .addTag('Handigo2.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`api/${process.env.MODULE}/v1/docs`, app, document);

  app.enableCors();

  const port = parseInt(process.env.PORT, 10) || 4002;
  await app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();
