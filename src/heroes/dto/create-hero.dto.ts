import { IsNotEmpty, IsString } from 'class-validator';
import { CreateKnightDto } from 'src/knights/dto/create-knight.dto';

export class CreateHeroDto extends CreateKnightDto {
  @IsString()
  @IsNotEmpty()
  _id: string;
}
