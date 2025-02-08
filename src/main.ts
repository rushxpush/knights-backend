import { NestFactory, SerializedGraph } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    snapshot: true,
  });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { port: 3001 },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.startAllMicroservices();
  // await app.listen(process.env.PORT ?? 3001);
  writeFileSync(
    'src/saved_files/graph.json',
    app.get(SerializedGraph).toString(),
  );
  logger.log('knights-backend is listening');
}
bootstrap();
