import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroesService } from './heroes.service';
import { Hero, HeroSchema } from './models/heroes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Hero.name, schema: HeroSchema }]),
  ],
  providers: [HeroesService],
  exports: [HeroesService],
})
export class HeroesModule {}
