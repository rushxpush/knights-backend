import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { Knight } from 'src/knights/models/knights.schema';

describe('Knights Integration Tests', () => {
  let knightModel: any;
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(getModelToken(Knight.name))
    .useValue(knightModel)
    .compile();
});
