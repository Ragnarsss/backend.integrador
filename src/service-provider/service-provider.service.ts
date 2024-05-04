import { Injectable } from '@nestjs/common';
import { CreateProfessionalInput } from './dto/create-service-provider.input';
import { UpdateProfessionalInput } from './dto/update-service-provider.input';

@Injectable()
export class ProfessionalService {
  create(createProfessionalInput: CreateProfessionalInput) {
    return 'This action adds a new Professional';
  }

  findAll() {
    return `This action returns all Professional`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Professional`;
  }

  update(id: number, updateProfessionalInput: UpdateProfessionalInput) {
    return `This action updates a #${id} Professional`;
  }

  remove(id: number) {
    return `This action removes a #${id} Professional`;
  }
}
