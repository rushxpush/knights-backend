import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Attributes } from '../interfaces/attributes.interface';
import { Weapon } from '../interfaces/weapon.interface';
import { Type } from 'class-transformer';

export class CreateKnightDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  birthday: Date;

  @IsNotEmpty()
  weapons: Array<Weapon>;

  @IsNotEmpty()
  attributes: Attributes;

  @IsString()
  @IsNotEmpty()
  keyAttribute: string;
}
