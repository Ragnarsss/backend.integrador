import { CreateProfessionalInput } from './create-service-provider.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProfessionalInput extends PartialType(
  CreateProfessionalInput,
) {
  id: number;
}
