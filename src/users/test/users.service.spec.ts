import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { log } from 'console';

let usersService: UsersService;

const users = [
  {
    userId: '1',
    username: 'john',
    password: 'johnpass',
  },
  {
    userId: '2',
    username: 'mary',
    password: 'marypass',
  },
];

describe('UsersService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return an user by passing an username present in the database', async () => {
      const result = await usersService.findOne(users[0].username);

      expect(result.username).toBe(users[0].username);
    });

    it('should return undefined by passing an username not found in the database', async () => {
      const result = await usersService.findOne('notinthedatabase');

      expect(result).toBe(undefined);
    });
  });
});
