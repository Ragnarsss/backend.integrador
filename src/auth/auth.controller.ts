import { ref } from 'joi';
import { AuthService } from './auth.service';
import { AuthDto, RefreshTokenDto } from './dto/auth.dto';

import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: AuthDto) {
    try {
      const data = await this.authService.login(loginData);

      return {
        success: true,
        message: 'User logged in',
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to login',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshData: RefreshTokenDto) {
    const { email, refreshToken } = refreshData;
    try {
      const data = await this.authService.refreshToken(email, refreshToken);

      return {
        success: true,
        message: 'Token refreshed',
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to refresh token',
        error: (error as Record<string, string>)?.message,
      };
    }
  }
}
