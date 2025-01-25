import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateKnightDto } from 'src/knights/dto/create-knight.dto';

export class CreateHeroDto extends CreateKnightDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsBoolean()
  @IsNotEmpty()
  isHero: boolean;

  @IsNumber()
  @IsNotEmpty()
  age: number;
}
