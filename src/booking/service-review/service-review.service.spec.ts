import { Test, TestingModule } from '@nestjs/testing';
import { ServiceReviewService } from './service-review.service';

describe('ServiceReviewService', () => {
  let service: ServiceReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceReviewService],
    }).compile();

    service = module.get<ServiceReviewService>(ServiceReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
