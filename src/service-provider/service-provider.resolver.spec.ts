import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalResolver } from './service-provider.resolver';
import { ProfessionalService } from './service-provider.service';

describe('ProfessionalResolver', () => {
  let resolver: ProfessionalResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessionalResolver, ProfessionalService],
    }).compile();

    resolver = module.get<ProfessionalResolver>(ProfessionalResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
