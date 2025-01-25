import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroesService } from './heroes.service';
import { Hero, HeroSchema } from './models/heroes.schema';
import { KnightsCalculationProvider } from 'src/knights/providers/knights-calculation.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hero.name, schema: HeroSchema }]),
  ],
  providers: [HeroesService, KnightsCalculationProvider],
  exports: [HeroesService],
})
export class HeroesModule {}
