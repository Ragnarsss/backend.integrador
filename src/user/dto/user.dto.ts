import { PartialType } from '@nestjs/mapped-types';

export class UserDto {
  id: string;
  email: string;
  password: string;
  name: string;
}

export class CreateUserDto extends UserDto {}

export class UpdateUserDto extends PartialType(UserDto) {}
