import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ServiceService } from './service.service';
import { CreateServiceInput, UpdateServiceInput } from './dto/service.dto';

@Resolver()
export class ServiceResolver {
  constructor(private readonly serviceService: ServiceService) {}

  @Mutation('createService')
  async createService(
    @Args('createServiceInput') createServiceInput: CreateServiceInput,
  ) {
    return this.serviceService.create(createServiceInput);
  }

  @Query('services')
  async getServices() {
    return this.serviceService.findAll();
  }

  @Query('service')
  async getServiceById(@Args('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Mutation('updateService')
  async updateService(
    @Args('id') id: string,
    @Args('updateServiceInput') updateServiceInput: UpdateServiceInput,
  ) {
    return this.serviceService.update(id, updateServiceInput);
  }

  @Mutation('removeService')
  async removeService(@Args('id') id: string) {
    return this.serviceService.remove(id);
  }
}
