import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthCreateUser } from './dto/auth-createUser.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'jsonwebtoken';
import { RefreshJwt } from './dto/refresh-jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(authCreateUser: AuthCreateUser) {
    const user = await this.userService.create(authCreateUser);

    const { password, ...result } = user;

    return result;
  }

  async validateUser(authCreateUser: AuthCreateUser): Promise<any> {
    const users = await this.userService.getAll();

    const user = users.find((user) => {
      const checkPass = bcrypt.compareSync(
        authCreateUser.password,
        user.password,
      );

      if (user.login !== authCreateUser.login) {
        throw new ForbiddenException('the password or login is not correct');
      } else if (!checkPass) {
        throw new ForbiddenException('the password or login is not correct');
      } else {
        return user;
      }
    });

    return user;
  }

  async login(authCreateUser: AuthCreateUser) {
    const user = await this.validateUser(authCreateUser);

    const payload: JwtPayload = { login: user.login, userId: user.id };

    return await this.getTokenAndRefreshToken(payload);
  }

  async getTokenAndRefreshToken(payload) {
    const accessToken = await this.accessToken(payload);

    const refreshToken = await this.refreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(payload) {
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
    });
    return refreshToken;
  }

  async accessToken(payload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
    });
    return accessToken;
  }

  async decodeJwtToken(token) {
    return this.jwtService.verifyAsync(token);
  }

  async refresh(token: RefreshJwt) {
    try {
      const decodeJwtToken = await this.jwtService.verifyAsync(
        token.refreshToken,
        { secret: this.configService.get('JWT_SECRET_KEY') },
      );

      const payload = { decodeJwtToken };

      const accessToken = await this.accessToken(payload);
      const refreshToken = await this.refreshToken(payload);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new ForbiddenException('invalid jwt token');
    }
  }
}
