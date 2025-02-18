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
    console.log('4 - users-service - service findOne');
    console.log('username: ', username);
    const user = this.users.find((user) => user.username === username);
    return user
      ? user
      : { userId: undefined, username: undefined, password: undefined };
  }
}
