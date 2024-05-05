import { PrismaService } from './../prisma/prisma.service';

import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as generator from 'generate-password';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      prismaError('', error.code);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      return user;
    } catch (error) {
      prismaError(id, error.code);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({ where: { email } });
    } catch (error) {
      prismaError(email, error.code);
    }
  }

  async create(registerData: Prisma.UserCreateInput): Promise<User> {
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
      prismaError(registerData.email, error.code);
    }
  }

  async update(id: string, updateData: Prisma.UserUpdateInput): Promise<User> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new NotFoundException(`User ${id} not found`);
      }

      return await this.prisma.user.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      prismaError(id, error.code);
    }
  }

  async delete(email: string): Promise<User> {
    try {
      const user = await this.findByEmail(email);

      if (!user) {
        throw new NotFoundException(`User ${email} not found`);
      }

      return await this.prisma.user.delete({ where: { email } });
    } catch (error) {
      prismaError(email, error.code);
    }
  }

  async recoverPassword(email: string): Promise<User> {
    try {
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

      await bcrypt.hash(generatedPassword, 10).then((hashPassword: string) => {
        user.password = hashPassword;
      });

      return this.prisma.user.update({
        where: { email },
        data: user,
      });
    } catch (error) {
      prismaError(email, error.code);
    }
  }
}

const prismaError = (keyParam = 'no key', errorCode: string) => {
  switch (errorCode) {
    case 'P2002':
      throw new ConflictException(
        `A user with the key ${keyParam} already exists.`,
      );
    case 'P2003':
      throw new BadRequestException('Invalid foreign key:');
    case 'P1001':
      throw new InternalServerErrorException(
        'Failed to connect to the database.',
      );
    default:
      throw new InternalServerErrorException('Something went wrong.');
  }
};
