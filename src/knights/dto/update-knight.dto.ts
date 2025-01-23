import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateKnightDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;
}
