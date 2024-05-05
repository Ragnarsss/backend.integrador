import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { Prisma } from '@prisma/client';

@Resolver('Booking')
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Mutation('createBooking')
  createBooking(
    @Args('createBookingInput') createBookingInput: Prisma.BookingCreateInput,
  ) {
    return this.bookingService.create(createBookingInput);
  }

  @Query('bookings')
  findAll() {
    return this.bookingService.findAll();
  }

  @Query('booking')
  findOne(@Args('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Mutation('updateBooking')
  updateBooking(
    @Args('updateBookingInput') updateBookingInput: Prisma.BookingUpdateInput,
  ) {
    return this.bookingService.update(
      updateBookingInput.id as string,
      updateBookingInput,
    );
  }

  @Mutation('removeBooking')
  removeBooking(@Args('id') id: string) {
    return this.bookingService.remove(id);
  }
}
