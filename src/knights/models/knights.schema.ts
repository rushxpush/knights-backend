import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Weapon } from '../interfaces/weapon.interface';
import { Attributes } from '../interfaces/attributes.interface';

export type KnightDocument = HydratedDocument<Knight>;

@Schema()
export class Knight {
  @Prop()
  name: string;

  @Prop()
  nickname: string;

  @Prop()
  birthday: Date;

  @Prop()
  weapons: Array<Weapon>;

  @Prop({ type: Object })
  attributes: Attributes;

  @Prop()
  keyAttribute: string;
}

export const KnightSchema = SchemaFactory.createForClass(Knight);
