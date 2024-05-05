import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceInput, UpdateServiceInput } from './dto/service.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceInput: CreateServiceInput) {
    return this.prisma.service.create({ data: createServiceInput });
  }

  async findAll() {
    return this.prisma.service.findMany();
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async update(id: string, updateServiceInput: UpdateServiceInput) {
    const { name, price, description, isActive } = updateServiceInput;
    return this.prisma.service.update({
      where: { id },
      data: { name, price, description, isActive },
    });
  }

  async remove(id: string) {
    return this.prisma.service.delete({ where: { id } });
  }
}
