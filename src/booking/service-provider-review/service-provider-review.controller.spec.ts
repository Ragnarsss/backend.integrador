import { Test, TestingModule } from '@nestjs/testing';
import { ServiceProviderReviewController } from './service-provider-review.controller';

describe('ServiceProviderReviewController', () => {
  let controller: ServiceProviderReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceProviderReviewController],
    }).compile();

    controller = module.get<ServiceProviderReviewController>(ServiceProviderReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
