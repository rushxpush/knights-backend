import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  const stubValues = {
    validUserDto: {
      username: 'john',
      password: 'johnpass',
    },
    invalidUserDto: {
      username: 'invalidUser',
      password: 'johnpass',
    },
    accessToken: 'validAccessToken',
    payload: {
      sub: '1',
      username: 'john',
    },
    userService: {
      findOne: {
        userId: '1',
        username: 'john',
        password: 'johnpass',
      },
    },
  };

  beforeEach(async () => {
    usersService = {
      findOne: jest.fn(),
    };

    jwtService = {
      signAsync: jest.fn().mockResolvedValue(stubValues.accessToken),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn method', () => {
    it('should return a token when credentials are valid', async () => {
      (usersService.findOne as jest.Mock).mockResolvedValue(
        stubValues.userService.findOne,
      );
      const result = await authService.signIn(stubValues.validUserDto);

      expect(result).toEqual({ access_token: stubValues.accessToken });
      expect(jwtService.signAsync).toHaveBeenCalledWith(stubValues.payload);
    });

    it('should throw UnauthorizedException when the credentials are invalid', async () => {
      try {
        (usersService.findOne as jest.Mock).mockResolvedValue(undefined);

        await authService.signIn(stubValues.invalidUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.status).toEqual(HttpStatus.UNAUTHORIZED);
        expect(error.message).toEqual(
          'Erro! Usuário ou senha não autorizados.',
        );
      }
    });
  });
});
