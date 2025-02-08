import { Body, Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { delay, of } from 'rxjs';
import { SignInDto } from 'src/users-service/dto/sign-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'ping' })
  ping() {
    console.log('AuthService received ping');
    return of('pong').pipe(delay(2000));
  }

  @MessagePattern('validate_token')
  async validateToken(data: { token: string }) {
    return this.authService.validateToken(data.token);
  }

  @MessagePattern('get_token')
  signIn(@Payload() signInDto: SignInDto) {
    console.log('1 - auth-service - controller signIn');
    return this.authService.signIn(signInDto);
  }
}
