import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnightsModule } from './knights/knights.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/knights-challenge'),
    KnightsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
