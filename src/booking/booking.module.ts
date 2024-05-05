import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingResolver } from './booking.resolver';
import { ServiceReviewController } from './service-review/service-review.controller';
import { ProfessionalReviewController } from './professional-review/professional-review.controller';
import { ProfessionalReviewService } from './professional-review/professional-review.service';
import { ServiceReviewService } from './service-review/service-review.service';

@Module({
  providers: [BookingResolver, BookingService, ProfessionalReviewService, ServiceReviewService],
  controllers: [ServiceReviewController, ProfessionalReviewController],
})
export class BookingModule {}
