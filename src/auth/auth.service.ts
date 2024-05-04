import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

import * as jwt from 'jsonwebtoken';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authData: AuthDto) {
    const { email, password } = authData;

    try {
      const user = await this.usersService.findByEmail(email);

      if (!user)
        throw new ForbiddenException(
          'No existe una cuenta asociada a este correo',
        );

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch)
        throw new UnauthorizedException('Invalid credentials');

      const accessToken = await this.jwtService.signAsync(
        {
          email: user.email,
          sub: user.id,
        },
        {
          secret: process.env.JWT_LOGIN_SECRET,
          expiresIn: process.env.JWT_LOGIN_EXPIRES_IN,
        },
      );

      const refreshToken = await this.jwtService.signAsync(
        {
          email: user.email,
          sub: user.id,
        },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
        },
      );

      const response = {
        statusCode: 200,
        message: 'Login successful',
        success: true,
        data: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: user,
        },
      };

      return response;
    } catch (error) {
      return {
        statusCode: 401,
        message: error.message,
        success: false,
      };
    }
  }

  async refreshToken(email: string, refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      });

      // Check if the email in the payload matches the provided email
      if (payload.email !== email) {
        throw new UnauthorizedException(
          'Email does not match the one in the refresh token',
        );
      }

      const user = await this.usersService.findByEmail(email);

      if (!user) {
        throw new NotFoundException(`User ${payload.email} not found`);
      }

      // Generate a new refresh token
      const newRefreshToken = await this.jwtService.signAsync({
        email: user.email,
        sub: user.id,
      });

      return {
        access_token: this.jwtService.sign(
          {
            username: user.userName,
            sub: user.id,
          },
          {
            secret: process.env.JWT_LOGIN_SECRET,
            expiresIn: process.env.JWT_LOGIN_EXPIRES_IN,
          },
        ),
        refresh_token: newRefreshToken,
      };
    } catch (e) {
      if (e instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException('Invalid refresh token: ' + e.message);
      } else {
        throw new UnauthorizedException('Unknown error: ' + e.message);
      }
    }
  }
}
