import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ServiceProviderService } from './service-provider.service';
import { CreateServiceProviderInput } from './dto/create-service-provider.input';
import { UpdateServiceProviderInput } from './dto/update-service-provider.input';

@Resolver('ServiceProvider')
export class ServiceProviderResolver {
  constructor(private readonly serviceProviderService: ServiceProviderService) {}

  @Mutation('createServiceProvider')
  create(@Args('createServiceProviderInput') createServiceProviderInput: CreateServiceProviderInput) {
    return this.serviceProviderService.create(createServiceProviderInput);
  }

  @Query('serviceProvider')
  findAll() {
    return this.serviceProviderService.findAll();
  }

  @Query('serviceProvider')
  findOne(@Args('id') id: number) {
    return this.serviceProviderService.findOne(id);
  }

  @Mutation('updateServiceProvider')
  update(@Args('updateServiceProviderInput') updateServiceProviderInput: UpdateServiceProviderInput) {
    return this.serviceProviderService.update(updateServiceProviderInput.id, updateServiceProviderInput);
  }

  @Mutation('removeServiceProvider')
  remove(@Args('id') id: number) {
    return this.serviceProviderService.remove(id);
  }
}
