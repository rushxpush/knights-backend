import { Module } from '@nestjs/common';
import { KnightsService } from './knights.service';
import { KnightsController } from './knights.controller';
// import { DatabaseModule } from 'src/libs/common/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Knight, KnightSchema } from './models/knights.schema';

@Module({
  imports: [
    // DatabaseModule,
    MongooseModule.forFeature([{ name: Knight.name, schema: KnightSchema }]),
  ],
  controllers: [KnightsController],
  providers: [KnightsService],
})
export class KnightsModule {}
