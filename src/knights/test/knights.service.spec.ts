import { Test, TestingModule } from '@nestjs/testing';
import { KnightsService } from '../knights.service';
import { KnightsCalculationProvider } from '../providers/knights-calculation.provider';
import { HeroesService } from 'src/heroes/heroes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Knight } from '../models/knights.schema';
import { createKnightDtoStub } from './stubs/createKnightDto.stub';
import { returnCreatedKnightStub } from './stubs/returnCreatedKnight.stub';
import { knightStub } from './stubs/knight.stub';
import { returnHeroesStub } from './stubs/returnHeroes.stub';
import { HttpException, HttpStatus } from '@nestjs/common';
import { returnUpdatedKnightStub } from './stubs/returnUpdatedKnight.stub';
import { updateKnightDtoStub } from './stubs/updateKnightDto.stub';

describe('KnightsService', () => {
  let knightsService: KnightsService;
  let knightModel: any;
  let heroesService: any;
  let calcProvider: any;

  const testValues = {
    experience: 1503,
    attack: 15,
    age: 24,
    invalidId: 'invalid_id',
    notFoundId: '67914e6e1d5a7b574bce8a08',
  };

  const exceptionTestValues = {
    badRequestMessage: 'Formato de ID inválido',
    notFoundMessage: 'Cavaleiro não encontrado',
  };

  beforeEach(async () => {
    knightModel = {
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findOneAndUpdate: jest.fn(),
      update: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    heroesService = {
      create: jest.fn(),
      findAll: jest.fn(),
    };

    calcProvider = {
      calculateExperience: jest.fn().mockReturnValue(testValues.experience),
      calculateAttack: jest.fn().mockReturnValue(testValues.attack),
      calculateAge: jest.fn().mockReturnValue(testValues.age),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KnightsService,
        {
          provide: KnightsCalculationProvider,
          useValue: calcProvider,
        },
        {
          provide: HeroesService,
          useValue: heroesService,
        },
        {
          provide: getModelToken(Knight.name),
          useValue: knightModel,
        },
      ],
    }).compile();

    knightsService = module.get<KnightsService>(KnightsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(knightsService).toBeDefined();
  });

  describe('create', () => {
    it('should call knightModel.create with the correct parameters', async () => {
      knightModel.create.mockResolvedValue(returnCreatedKnightStub());
      const result = await knightsService.create(createKnightDtoStub());

      expect(knightModel.create).toHaveBeenCalledWith(createKnightDtoStub());
      expect(result).toEqual(returnCreatedKnightStub());
    });
  });

  describe('findAll', () => {
    it('should return all knights with calculated fields', async () => {
      knightModel.find.mockReturnValue({
        lean: () => {
          return [returnCreatedKnightStub()];
        },
      });

      const result = await knightsService.findAll();

      expect(result).toEqual([
        {
          ...returnCreatedKnightStub(),
          experience: testValues.experience,
          attack: testValues.attack,
          age: testValues.age,
        },
      ]);

      expect(calcProvider.calculateExperience).toHaveBeenCalledWith(
        returnCreatedKnightStub(),
      );
      expect(calcProvider.calculateAttack).toHaveBeenCalledWith(
        returnCreatedKnightStub(),
      );
      expect(calcProvider.calculateAge).toHaveBeenCalledWith(
        returnCreatedKnightStub(),
      );
    });
  });

  describe('findAllHeroes', () => {
    it('should return all heroes', async () => {
      jest
        .spyOn(heroesService, 'findAll')
        .mockResolvedValue(returnHeroesStub());

      const heroes = await knightsService.findAllHeroes();

      expect(heroes).toEqual(returnHeroesStub());
    });
  });

  describe('findOne', () => {
    it('should return a knight with calculated fields', async () => {
      knightModel.findById.mockReturnValue({
        lean: () => {
          return returnCreatedKnightStub();
        },
      });

      const result = await knightsService.findOne(knightStub()._id);

      expect(result).toEqual({
        ...returnCreatedKnightStub(),
        experience: testValues.experience,
        attack: testValues.attack,
        age: testValues.age,
      });
    });

    it('should throw an HttpException for invalid ID format', async () => {
      try {
        await knightsService.findOne(testValues.invalidId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.message).toEqual(exceptionTestValues.badRequestMessage);
      }
    });

    it('should throw an HttpException if a knight is not found', async () => {
      try {
        knightModel.findById.mockReturnValue({
          lean: () => null,
        });
        await knightsService.findOne(testValues.notFoundId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
        expect(error.message).toEqual(exceptionTestValues.notFoundMessage);
      }
    });
  });

  describe('update', () => {
    it('should update the nickname of a knight', async () => {
      await knightModel.findOneAndUpdate.mockReturnValue(
        returnCreatedKnightStub(),
      );

      await knightModel.findById.mockReturnValue({
        lean: () => returnUpdatedKnightStub(),
      });

      const updatedKnight = await knightsService.update(
        knightStub()._id,
        updateKnightDtoStub(),
      );

      expect(updatedKnight).toEqual({
        ...returnUpdatedKnightStub(),
        experience: testValues.experience,
        attack: testValues.attack,
        age: testValues.age,
      });
    });

    it('should throw an HttpException for invalid _id format', async () => {
      try {
        await knightsService.update(
          testValues.invalidId,
          updateKnightDtoStub(),
        );
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.message).toEqual(exceptionTestValues.badRequestMessage);
      }
    });

    it('should throw an HttpException if a knight is not found', async () => {
      try {
        await knightModel.findOneAndUpdate(
          testValues.notFoundId,
          updateKnightDtoStub(),
        );
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
        expect(error.message).toEqual(exceptionTestValues.notFoundMessage);
      }
    });
  });

  describe('remove', () => {
    it('should remove a knight', async () => {
      await knightModel.findByIdAndDelete.mockReturnValue({
        lean: () => returnCreatedKnightStub(),
      });
      heroesService.create.mockReturnValue();

      const result = await knightsService.remove(knightStub()._id);

      expect(result).toEqual(returnCreatedKnightStub());
    });

    it('should create an hero from the removed knight', () => {});

    it('should throw an HttpException for invalid _id format', async () => {
      try {
        await knightsService.remove(testValues.invalidId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.message).toEqual(exceptionTestValues.badRequestMessage);
      }
    });

    it('should throw an HttpException if a knight is not found', async () => {
      try {
        knightModel.findByIdAndDelete.mockReturnValue({
          lean: () => null,
        });

        await knightsService.remove(testValues.notFoundId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
        expect(error.message).toEqual(exceptionTestValues.notFoundMessage);
      }
    });
  });
});
