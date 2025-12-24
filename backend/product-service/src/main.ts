import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);

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

  await app.startAllMicroservices();
  await app.listen(HTTP_PORT);
}

bootstrap();
