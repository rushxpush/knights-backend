import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnightsModule } from './knights/knights.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { OldAuthModule } from './auth/oldauth.module';
// import { UsersModule } from './users-service/users.module';
import { ConfigModule } from '@nestjs/config';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './auth/auth.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/knights-challenge'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'auth_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
    KnightsModule,
    // OldAuthModule,
    // UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
