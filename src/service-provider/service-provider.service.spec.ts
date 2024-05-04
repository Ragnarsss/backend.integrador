import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalService } from './service-provider.service';

describe('ProfessionalService', () => {
  let service: ProfessionalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessionalService],
    }).compile();

    service = module.get<ProfessionalService>(ProfessionalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
