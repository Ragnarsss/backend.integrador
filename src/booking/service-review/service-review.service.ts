import { Injectable } from '@nestjs/common';
import { CreateServiceReviewInput } from './dto/create-service-review.input';
import { UpdateServiceReviewInput } from './dto/update-service-review.input';

@Injectable()
export class ServiceReviewService {
  create(createServiceReviewInput: CreateServiceReviewInput) {
    return 'This action adds a new serviceReview';
  }

  findAll() {
    return `This action returns all serviceReview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceReview`;
  }

  update(id: number, updateServiceReviewInput: UpdateServiceReviewInput) {
    return `This action updates a #${id} serviceReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceReview`;
  }
}
