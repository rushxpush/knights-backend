import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

console.log('process.env.JWT_SECRET: ', process.env.JWT_SECRET);
@Module({
  imports: [
    // UsersModule,
    ClientsModule.register([
      {
        name: 'CLIENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
    JwtModule.registerAsync({
      useFactory: () => ({
        // global: true,
        secret: process.env.JWT_SECRET || 'default_secret',
        signOptions: { expiresIn: '600s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
