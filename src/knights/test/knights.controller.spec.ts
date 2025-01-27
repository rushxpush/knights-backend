import { Test, TestingModule } from '@nestjs/testing';
import { KnightsController } from '../knights.controller';
import { KnightsService } from '../knights.service';
import { Knight } from '../models/knights.schema';
import { knightStub } from './stubs/knight.stub';
import { KnightsCalculationProvider } from '../providers/knights-calculation.provider';
import { HeroesService } from '../../heroes/heroes.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { returnCreatedKnightStub } from './stubs/returnCreatedKnight.stub';
import { createKnightDtoStub } from './stubs/createKnightDto.stub';
import { updateKnightDtoStub } from './stubs/updateKnightDto.stub';
import { returnUpdatedKnightStub } from './stubs/returnUpdatedKnight.stub';
import { returnDeletedKnightStub } from './stubs/returnDeletedKnight.stub';

jest.mock('../knights.service');
jest.mock('../../heroes/heroes.service');

describe('KnightsController', () => {
  let knightsController: KnightsController;
  let knightsService: KnightsService;
  const wrongFormatId: string = '67914e6e1d5a7b574bce8a0'; // missing a character
  const idNotInTheDatabase: string = '67914e6e1d5a7b574bce8a08';

  beforeEach(async () => {
    const mockKnightModel = {
      create: jest.fn(),
      findAll: jest.fn(),
      findAllHeroes: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const mockHeroesService = {
      create: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnightsController],
      providers: [
        KnightsService,
        KnightsCalculationProvider,
        {
          provide: HeroesService,
          useValue: jest.fn(),
        },
        {
          provide: getModelToken(Knight.name),
          useValue: mockKnightModel,
        },
        {
          provide: HeroesService,
          useValue: mockHeroesService,
        },
      ],
    }).compile();

    knightsController = module.get<KnightsController>(KnightsController);
    knightsService = module.get<KnightsService>(KnightsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(knightsController).toBeDefined();
  });

  describe('create', () => {
    describe('when create is called', () => {
      it('should create a new knight', async () => {
        jest
          .spyOn(knightsService, 'create')
          .mockResolvedValueOnce(returnCreatedKnightStub() as any);

        const result = await knightsController.create(createKnightDtoStub());
        expect(result).toEqual(returnCreatedKnightStub());
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let knight;

      beforeEach(async () => {
        jest
          .spyOn(knightsService, 'findOne')
          .mockImplementation(async () => knightStub());

        knight = await knightsController.findOne(knightStub()._id);
      });

      it('should call knightsService', async () => {
        expect(knightsService.findOne).toHaveBeenCalledWith(knightStub()._id);
      });

      it('should return a knight', () => {
        expect(knight).toEqual(knightStub());
      });
    });

    it('should throw an HttpException when the ID format is invalid', async () => {
      jest.spyOn(knightsService, 'findOne').mockImplementation(() => {
        throw new HttpException(
          'Formato de ID inválido',
          HttpStatus.BAD_REQUEST,
        );
      });

      try {
        await knightsController.findOne(wrongFormatId);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(error.message).toEqual('Formato de ID inválido');
      }
    });

    it('should throw a NotFoundException if knight is not found', async () => {
      jest.spyOn(knightsService, 'findOne').mockImplementation(() => {
        throw new HttpException(
          'Cavaleiro não encontrado',
          HttpStatus.NOT_FOUND,
        );
      });
      try {
        await knightsController.findOne(idNotInTheDatabase);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
        expect(error.message).toEqual('Cavaleiro não encontrado');
      }
    });
  });

  describe('findAll', () => {
    it('should return all knights', async () => {
      jest
        .spyOn(knightsService, 'findAll')
        .mockResolvedValueOnce([returnCreatedKnightStub()] as any);

      const result = await knightsController.findAll();
      expect(result).toEqual([returnCreatedKnightStub()]);
    });
  });

  describe('update', () => {
    it('should update a knight', async () => {
      const updatedKnight = {
        ...returnCreatedKnightStub(),
        nickname: 'New Nickname',
      };
      jest
        .spyOn(knightsService, 'update')
        .mockResolvedValueOnce(returnUpdatedKnightStub() as any);

      const result = await knightsController.update(
        '67914e6e1d5a7b574bce8a07',
        updateKnightDtoStub(),
      );
      expect(result).toEqual(updatedKnight);
    });
  });

  describe('remove', () => {
    it('should remove a knight', async () => {
      jest
        .spyOn(knightsService, 'remove')
        .mockResolvedValueOnce(returnDeletedKnightStub() as any);

      const result = await knightsController.remove('67914e6e1d5a7b574bce8a07');

      expect(result).toEqual(returnDeletedKnightStub());
    });
  });
});
