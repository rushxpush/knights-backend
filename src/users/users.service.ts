import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
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

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
