import { NestFactory } from '@nestjs/core';
import { IdentityModule } from './identity.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@vendi/core';

async function bootstrap() {
  const app = await NestFactory.create(IdentityModule);

  const HTTP_PORT = parseInt(process.env.HTTP_PORT || '3000', 10);
  const MICROSERVICE_TCP_PORT = parseInt(
    process.env.MICROSERVICE_TCP_PORT || '3001',
    10,
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: MICROSERVICE_TCP_PORT,
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();
  await app.listen(HTTP_PORT);
}

bootstrap();
