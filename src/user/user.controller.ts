import { UserService } from './user.service';

import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  async findAll() {
    try {
      const foundUsers = await this.userService.findAll();
      return {
        success: true,
        message: 'Users found',
        data: foundUsers,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to found users',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Body() id: string) {
    try {
      const foundUser = await this.userService.findOne(id);
      return {
        success: true,
        message: 'User found',
        data: foundUser,
      };
    } catch (error) {
      return {
        success: false,
        message: 'User not found',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Post('create')
  async create(@Body() createData: Prisma.UserCreateInput) {
    console.log('here we are out', createData);

    try {
      console.log('here we are in');

      const createdUser = await this.userService.create(createData);
      return {
        success: true,
        message: 'User created succesfully',
        data: createdUser,
      };
    } catch (error) {
      if (error.code === 'P1001') {
        return {
          success: false,
          message: 'Failed to connect to the database',
          error: (error as Record<string, string>)?.message,
        };
      } else {
        return {
          success: false,
          message: 'Failed to find users',
          error: (error as Record<string, string>)?.message,
        };
      }
    }
  }

  @Patch('update/:id')
  async update(
    @Body() updateData: Prisma.UserUpdateInput,
    @Param('id') id: string,
  ) {
    try {
      const updateUser = await this.userService.update(id, updateData);
      return {
        success: true,
        message: 'User updated succesfully',
        data: updateUser,
      };
    } catch (error) {
      console.log('dafuq');

      return {
        success: false,
        message: 'Failed to update user',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    try {
      const deletedUser = await this.userService.delete(id);
      return {
        success: true,
        message: 'User deleted succesfully',
        data: deletedUser,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete user',
        error: (error as Record<string, string>)?.message,
      };
    }
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    return {
      message: 'Password reset email sent',
    };
  }
}
