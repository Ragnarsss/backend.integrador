import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfessionalService {
  create(createProfessionalInput: Prisma.ProfessionalCreateInput) {
    return 'This action adds a new professional';
  }

  findAll() {
    return `This action returns all professional`;
  }

  findOne(id: string) {
    return `This action returns a #${id} professional`;
  }

  update(id: string, updateProfessionalInput: Prisma.ProfessionalUpdateInput) {
    return `This action updates a #${id} professional`;
  }

  remove(id: string) {
    return `This action removes a #${id} professional`;
  }
}
