import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { ServiceReviewModule } from './service-review/service-review.module';
import { ServiceProviderReviewModule } from './service-provider-review/service-provider-review.module';
import { ServiceProviderReviewController } from './service-provider-review/service-provider-review.controller';
import { ServiceReviewController } from './service-review/service-review.controller';

@Module({
  providers: [BookingResolver, BookingService],
  imports: [ServiceReviewModule, ServiceProviderReviewModule],
  controllers: [ServiceProviderReviewController, ServiceReviewController],
})
export class BookingModule {}
