import { Test, TestingModule } from '@nestjs/testing';
import { ServiceReviewController } from './service-review.controller';

describe('ServiceReviewController', () => {
  let controller: ServiceReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceReviewController],
    }).compile();

    controller = module.get<ServiceReviewController>(ServiceReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
