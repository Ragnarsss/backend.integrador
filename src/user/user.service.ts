import { PrismaService } from './../prisma/prisma.service';

import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as generator from 'generate-password';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new ConflictException(error.detail);
    }
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({ where: { email } });
    } catch (error) {
      throw new ConflictException(error.detail);
    }
  }

  async create(registerData: Prisma.UserCreateInput) {
    const { email, password, userName } = registerData;
    const foundUser = await this.findByEmail(email);

    if (foundUser) {
      throw new ConflictException(`User ${email} already exists`);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
      return await this.prisma.user.create({
        data: { email, password: hashPassword, userName },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('A user with this email already exists.');
      } else if (error.code === 'P2003') {
        throw new BadRequestException('Invalid foreign key.');
      } else if (error.code === 'P1001') {
        throw new InternalServerErrorException(
          'Failed to connect to the database.',
        );
      } else {
        throw new InternalServerErrorException(
          'Something went wrong: ' + error,
        );
      }
    }
  }

  async update(id: string, updateData: Prisma.UserUpdateInput) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User ${id} not found`);
    }

    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      // Unique constraint violation
      if (error.code === 'P2002') {
        throw new ConflictException(
          `Duplicate field: ${error.meta.target.join(', ')}`,
        );
      }

      // Invalid foreign key
      if (error.code === 'P2003') {
        throw new BadRequestException(
          `Invalid foreign key: ${error.meta.target.join(', ')}`,
        );
      }

      // Failed to connect to the database
      if (error.code === 'P1001') {
        throw new InternalServerErrorException(
          'Failed to connect to the database.',
        );
      }
      throw new InternalServerErrorException('Something went wrong.');
    }
  }

  async delete(email: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    await this.prisma.user.delete({ where: { email } });

    return user;
  }

  async recoverPassword(email: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    const generatedPassword = generator.generate({
      length: 8,
      uppercase: true,
      numbers: true,
      symbols: '*',
      strict: true,
    });

    const hashPassword = await bcrypt.hash(generatedPassword, 10);

    user.password = hashPassword;

    await this.prisma.user
      .update({
        where: { email },
        data: user,
      })
      .then(() => {
        return generatedPassword;
      })
      .catch((error) => {
        throw new ConflictException(error.detail);
      });
  }
}
