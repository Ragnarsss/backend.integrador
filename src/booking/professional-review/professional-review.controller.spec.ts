import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalReviewController } from './professional-review.controller';

describe('ProfessionalReviewController', () => {
  let controller: ProfessionalReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionalReviewController],
    }).compile();

    controller = module.get<ProfessionalReviewController>(ProfessionalReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
