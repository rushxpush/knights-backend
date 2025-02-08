import { Module } from '@nestjs/common';
import { KnightsService } from './knights.service';
import { KnightsController } from './knights.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Knight, KnightSchema } from './models/knights.schema';
import { HeroesModule } from 'src/heroes/heroes.module';
import { KnightsCalculationProvider } from './providers/knights-calculation.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Knight.name, schema: KnightSchema }]),
    HeroesModule,
  ],
  controllers: [KnightsController],
  providers: [KnightsService, KnightsCalculationProvider],
})
export class KnightsModule {}
