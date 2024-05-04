import { Module } from '@nestjs/common';
import { ProfessionalService } from './service-provider.service';
import { ProfessionalResolver } from './service-provider.resolver';

@Module({
  providers: [ProfessionalResolver, ProfessionalService],
})
export class ProfessionalModule {}
