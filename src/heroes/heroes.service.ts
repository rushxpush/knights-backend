import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hero } from './models/heroes.schema';
import { Model } from 'mongoose';
import { CreateKnightDto } from 'src/knights/dto/create-knight.dto';
import { KnightsCalculationProvider } from 'src/knights/providers/knights-calculation.provider';

@Injectable()
export class HeroesService {
  constructor(
    @InjectModel(Hero.name) private readonly heroModel: Model<Hero>,
    private readonly calcProvider: KnightsCalculationProvider,
  ) {}

  async create(_id: string, createKnightDto: CreateKnightDto) {
    const createHeroObj = {
      _id,
      ...createKnightDto,
      isHero: true,
      age: this.calcProvider.calculateAge(createKnightDto),
      experience: this.calcProvider.calculateExperience(createKnightDto),
      attack: this.calcProvider.calculateAttack(createKnightDto),
    };
    return this.heroModel.create(createHeroObj);
  }

  async findAll() {
    return this.heroModel.find();
  }
}
