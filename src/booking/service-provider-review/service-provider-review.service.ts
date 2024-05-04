import { Injectable } from '@nestjs/common';
import { CreateServiceProviderReviewInput } from './dto/create-service-provider-review.input';
import { UpdateServiceProviderReviewInput } from './dto/update-service-provider-review.input';

@Injectable()
export class ServiceProviderReviewService {
  create(createServiceProviderReviewInput: CreateServiceProviderReviewInput) {
    return 'This action adds a new serviceProviderReview';
  }

  findAll() {
    return `This action returns all serviceProviderReview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceProviderReview`;
  }

  update(id: number, updateServiceProviderReviewInput: UpdateServiceProviderReviewInput) {
    return `This action updates a #${id} serviceProviderReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceProviderReview`;
  }
}
