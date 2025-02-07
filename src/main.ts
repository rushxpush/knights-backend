import { NestFactory, SerializedGraph } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    snapshot: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
  writeFileSync(
    'src/saved_files/graph.json',
    app.get(SerializedGraph).toString(),
  );
}
bootstrap();
