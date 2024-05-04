import { PrismaService } from './../prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';
import { RegisterDto } from 'src/auth/dto/auth.dto';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async create(registerData: RegisterDto) {
    const { email, password } = registerData;
    const foundUser = await this.findByEmail(email);

    if (foundUser) {
      throw new ConflictException(`User ${email} already exists`);
    }

    const hashPassword = await bcrypt.hash(password, process.env.JWT_SALT);

    try {
      return await this.prisma.user.create({
        data: { email, password: hashPassword, ...registerData },
      });
    } catch (error) {
      throw new ConflictException(error.detail);
    }
  }

  async update(updateData: UpdateUserDto) {
    const { email } = updateData;
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    try {
      return await this.prisma.user.update({
        where: { email },
        data: updateData,
      });
    } catch (error) {
      throw new ConflictException(error.detail);
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

    const hashPassword = await bcrypt.hash(
      generatedPassword,
      process.env.JWT_SALT,
    );

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
