import { Controller, Get } from '@nestjs/common';
import { User, UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignInDto } from './dto/sign-auth.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('find-user')
  findOne(
    @Payload('signInDto') signInDto: SignInDto,
  ): Promise<User | undefined> {
    // return this.usersService.findOne(signInDto.username);
    console.log('3 - users-service - controller findOne');
    console.log('signInDto: ', signInDto);
    console.log('signInDto.username: ', signInDto.username);
    const user = this.usersService.findOne(signInDto.username);
    return user;
  }
}
