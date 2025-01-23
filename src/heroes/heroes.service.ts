import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hero } from './models/heroes.schema';
import { Model } from 'mongoose';
import { CreateKnightDto } from 'src/knights/dto/create-knight.dto';

@Injectable()
export class HeroesService {
  constructor(
    @InjectModel(Hero.name) private readonly heroModel: Model<Hero>,
  ) {}

  async create(_id: string, createKnightDto: CreateKnightDto) {
    const createHeroObj = {
      ...createKnightDto,
      _id,
    };
    return this.heroModel.create(createHeroObj);
  }
}
