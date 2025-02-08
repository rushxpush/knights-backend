import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { SignInDto } from 'src/users-service/dto/sign-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('CLIENT_SERVICE') private readonly clientService: ClientProxy,
  ) {}

  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.decode(token);
      return { valid: true, decoded };
    } catch {
      return { valid: false, error: 'invalid token' };
    }
  }

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    console.log('2 - auth-service - service signIn');

    console.log('signInDto: ', signInDto);
    try {
      const user = await firstValueFrom(
        this.clientService.send('find-user', { signInDto }),
      );
      console.log('user: ', user);

      if (user?.password !== signInDto.password) {
        throw new UnauthorizedException(
          'Erro! Usuário ou senha não autorizados.',
        );
      }
      const payload = { sub: user.userId, username: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      console.log('error: ', error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
