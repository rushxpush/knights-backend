import { Test, TestingModule } from '@nestjs/testing';
import { KnightsService } from './knights.service';
import { KnightsCalculationProvider } from './providers/knights-calculation.provider';
import { HeroesService } from 'src/heroes/heroes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Knight } from './models/knights.schema';

describe('KnightsService', () => {
  let service: KnightsService;

  beforeEach(async () => {
    const mockKnightModel = {
      create: jest.fn(),
      findAll: jest.fn(),
      findAllHeroes: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
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
      ],
    }).compile();

    service = module.get<KnightsService>(KnightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
