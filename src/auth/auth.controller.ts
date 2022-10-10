import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCreateUser } from './dto/auth-createUser.dto';
import { RefreshJwt } from './dto/refresh-jwt.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('signup')
  async singUp(@Body() authCreateUser: AuthCreateUser) {
    return await this.authService.signup(authCreateUser);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() authCreateUser: AuthCreateUser) {
    return await this.authService.login(authCreateUser);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Body() token: RefreshJwt) {
    return await this.authService.refresh(token);
  }
}
