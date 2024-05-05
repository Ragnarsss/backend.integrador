import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, PrismaService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
