import { CreateServiceProviderInput } from './create-service-provider.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateServiceProviderInput extends PartialType(CreateServiceProviderInput) {
  id: number;
}
