import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka, ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SignInDto } from 'src/users-service/dto/sign-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('CLIENT_SERVICE') private readonly clientService: ClientProxy,
    @Inject('KAFKA_CLIENT_SERVICE')
    private readonly kafkaClientService: ClientKafka,
  ) {}

  async validateToken(token: string) {
    try {
      const verified = this.jwtService.verify(token);
      return { valid: true, verified };
    } catch {
      return { valid: false, error: 'invalid token' };
    }
  }

  async signIn(signInPayload): Promise<{ access_token: string }> {
    console.log('2 - auth-service - service signIn');
    // console.log('singInPayload: ', signInPayload);
    const signInDto: SignInDto = signInPayload.signInDto;
    const headers = signInPayload.headers;
    const ipAddress = signInPayload.ipAdress;

    try {
      const user = await firstValueFrom(
        this.clientService.send('find-user', { signInDto }),
      );

      if (!user.username) {
        this.kafkaClientService.emit('auth.login.events', {
          serviceName: 'auth_service',
          logType: 'user_login',
          eventTimestamp: new Date(),
          username: signInDto.username,
          status: 'incorrect_username',
          ipAddress: ipAddress,
          userAgent: headers['user-agent'],
        });
        throw new RpcException({
          statusCode: 401,
          message: 'Erro! Usuário não autorizado.',
        });
      }

      if (user?.password !== signInDto.password) {
        this.kafkaClientService.emit('auth.login.events', {
          serviceName: 'auth_service',
          logType: 'user_login',
          eventTimestamp: new Date(),
          username: signInDto.username,
          status: 'incorrect_password',
          ipAddress: ipAddress,
          userAgent: headers['user-agent'],
        });
        throw new RpcException({
          statusCode: 401,
          message: 'Erro! Senha não autorizada.',
        });
      }
      const payload = { sub: user.userId, username: user.username };

      this.kafkaClientService.emit('auth.login.events', {
        serviceName: 'auth_service',
        logType: 'user_login',
        eventTimestamp: new Date(),
        username: signInDto.username,
        status: 'successful_login',
        ipAddress: ipAddress,
        userAgent: headers['user-agent'],
      });

      const token = await this.jwtService.signAsync(payload);
      console.log('Generated token: ', token);
      return {
        access_token: token,
      };
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }

      throw new RpcException({
        status: 500,
        message: 'Um erro inesperado ocorreu',
      });
    }
  }
}
