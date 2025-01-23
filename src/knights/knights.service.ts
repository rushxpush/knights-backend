import { Injectable } from '@nestjs/common';
import { CreateKnightDto } from './dto/create-knight.dto';
import { UpdateKnightDto } from './dto/update-knight.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Knight } from './models/knights.schema';
import { Model } from 'mongoose';
import { HeroesService } from 'src/heroes/heroes.service';
import { CreateHeroDto } from 'src/heroes/dto/create-hero.dto';
import { KnightsCalculationProvider } from './providers/knights-calculation.provider';

@Injectable()
export class KnightsService {
  constructor(
    @InjectModel(Knight.name) private readonly knightModel: Model<Knight>,
    private readonly heroesService: HeroesService,
    private readonly calcProvider: KnightsCalculationProvider,
  ) {}

  create(createKnightDto: CreateKnightDto) {
    return this.knightModel.create(createKnightDto);
  }

  async findAll() {
    const knights: Knight[] = await this.knightModel.find().lean();
    return knights.map((knight) => ({
      ...knight,
      experience: this.calcProvider.calculateExperience(knight),
      attack: this.calcProvider.calculateAttack(knight),
    }));
  }

  findAllHeroes() {
    return this.heroesService.findAll();
  }

  async findOne(_id: string) {
    const knight: Knight = await this.knightModel.findById({ _id }).lean();
    return {
      ...knight,
      experience: this.calcProvider.calculateExperience(knight),
      attack: this.calcProvider.calculateAttack(knight),
    };
  }

  update(_id: string, updateKnightDto: UpdateKnightDto) {
    return this.knightModel.findOneAndUpdate(
      { _id },
      { $set: updateKnightDto },
    );
  }

  async remove(_id: string) {
    const deletedKnight = await this.knightModel.findByIdAndDelete({ _id });
    await this.heroesService.create(
      _id,
      deletedKnight.toJSON() as undefined as CreateHeroDto,
    );
    return deletedKnight;
  }
}
