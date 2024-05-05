import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalResolver } from './professional.resolver';

@Module({
  providers: [ProfessionalResolver, ProfessionalService],
})
export class ProfessionalModule {}
