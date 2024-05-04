import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalReviewService } from './professional-review.service';

describe('ProfessionalReviewService', () => {
  let service: ProfessionalReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessionalReviewService],
    }).compile();

    service = module.get<ProfessionalReviewService>(ProfessionalReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
