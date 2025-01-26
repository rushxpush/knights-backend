import { Attributes } from './attributes.interface';
import { Weapon } from './weapon.interface';

export interface KnightInterface {
  _id: string;
  name: string;
  nickname: string;
  birthday: Date;
  weapons: Array<Weapon>;
  attributes: Attributes;
  keyAttribute: string;
  experience: number;
  attack: number;
  age: number;
}
