import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'auth_queue',
      queueOptions: { durable: false },
    },
  });

  const kafkaClient = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'auth-service-group',
        },
      },
    },
  );

  await app.startAllMicroservices();
  await kafkaClient.listen();
  await app.listen(3002);

  console.log('Auth microservice is running on port 3002...');
}

bootstrap();
