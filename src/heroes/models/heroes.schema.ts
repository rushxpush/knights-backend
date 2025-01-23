import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Knight } from 'src/knights/models/knights.schema';

export type HeroDocument = HydratedDocument<Hero>;

@Schema()
export class Hero extends Knight {
  @Prop()
  isHero: boolean;
}

export const HeroSchema = SchemaFactory.createForClass(Hero);
