import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookingService } from './booking.service';
import { Booking } from './booking.graph';
import { Prisma } from '@prisma/client';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Mutation(() => Booking)
  createBooking(
    @Args('createBookingInput') createBookingInput: Prisma.BookingCreateInput,
  ) {
    return this.bookingService.create(createBookingInput);
  }

  @Query(() => [Booking], { name: 'booking' })
  findAll() {
    return this.bookingService.findAll();
  }

  @Query(() => Booking, { name: 'booking' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.bookingService.findOne(id);
  }

  @Mutation(() => Booking)
  updateBooking(
    @Args('updateBookingInput') updateBookingInput: Prisma.BookingUpdateInput,
  ) {
    return this.bookingService.update(
      updateBookingInput.id,
      updateBookingInput,
    );
  }

  @Mutation(() => Booking)
  removeBooking(@Args('id', { type: () => Int }) id: number) {
    return this.bookingService.remove(id);
  }
}
