import { Test, TestingModule } from '@nestjs/testing';
import { ServiceProviderReviewService } from './service-provider-review.service';

describe('ServiceProviderReviewService', () => {
  let service: ServiceProviderReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceProviderReviewService],
    }).compile();

    service = module.get<ServiceProviderReviewService>(ServiceProviderReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
