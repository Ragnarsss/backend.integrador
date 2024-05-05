import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookingService {
  create(createBookingInput: Prisma.BookingCreateInput) {
    return 'This action adds a new booking';
  }

  findAll() {
    return `This action returns all booking`;
  }

  findOne(id: string) {
    return `This action returns a #${id} booking`;
  }

  update(id: string, updateBookingInput: Prisma.BookingUpdateInput) {
    return `This action updates a #${id} booking`;
  }

  remove(id: string) {
    return `This action removes a #${id} booking`;
  }
}
