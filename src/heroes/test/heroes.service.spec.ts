import { Test, TestingModule } from '@nestjs/testing';
import { HeroesService } from '../heroes.service';
import { KnightsCalculationProvider } from 'src/knights/providers/knights-calculation.provider';
import { getModelToken } from '@nestjs/mongoose';
import { Hero } from '../models/heroes.schema';
import { returnCreatedKnightStub } from 'src/knights/test/stubs/returnCreatedKnight.stub';
import { returnCreatedHeroStub } from './stubs/returnCreatedHero.stub';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('HeroesService', () => {
  let heroesService: HeroesService;
  let heroModel: any;
  let calcProvider: any;

  const testValues = {
    experience: 1503,
    attack: 15,
    age: 24,
    isHero: true,
    invalidId: 'invalid_id',
  };

  const exceptionTestValues = {
    badRequestMessage: 'Formato de ID inválido',
  };

  beforeEach(async () => {
    heroModel = {
      create: jest.fn(),
      find: jest.fn(),
    };

    calcProvider = {
      calculateExperience: jest.fn().mockReturnValue(testValues.experience),
      calculateAttack: jest.fn().mockReturnValue(testValues.attack),
      calculateAge: jest.fn().mockReturnValue(testValues.age),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroesService,
        {
          provide: KnightsCalculationProvider,
          useValue: calcProvider,
        },
        {
          provide: getModelToken(Hero.name),
          useValue: heroModel,
        },
      ],
    }).compile();

    heroesService = module.get<HeroesService>(HeroesService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(heroesService).toBeDefined();
  });

  describe('create', () => {
    it('should receive an removed knight and create a new hero', async () => {
      heroModel.create.mockReturnValue({
        ...returnCreatedKnightStub(),
        isHero: testValues.isHero,
        experience: testValues.experience,
        attack: testValues.attack,
        age: testValues.age,
      });

      const result = await heroesService.create(
        returnCreatedKnightStub()._id,
        returnCreatedKnightStub(),
      );

      expect(result).toEqual(returnCreatedHeroStub());
    });

    it('should throw an HttpExcetion for wrong _id format', async () => {
      try {
        await heroesService.create(
          testValues.invalidId,
          returnCreatedHeroStub(),
        );
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.message).toEqual(exceptionTestValues.badRequestMessage);
      }
    });
  });

  describe('findAll', () => {
    it('should return all heroes', async () => {
      heroModel.find.mockResolvedValue(returnCreatedHeroStub());

      const result = await heroesService.findAll();

      expect(result).toEqual(returnCreatedHeroStub());
    });
  });
});
