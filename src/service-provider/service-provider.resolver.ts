import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfessionalService } from './service-provider.service';
import { CreateProfessionalInput } from './dto/create-service-provider.input';
import { UpdateProfessionalInput } from './dto/update-service-provider.input';

@Resolver('Professional')
export class ProfessionalResolver {
  constructor(private readonly ProfessionalService: ProfessionalService) {}

  @Mutation('createProfessional')
  create(
    @Args('createProfessionalInput')
    createProfessionalInput: CreateProfessionalInput,
  ) {
    return this.ProfessionalService.create(createProfessionalInput);
  }

  @Query('Professional')
  findAll() {
    return this.ProfessionalService.findAll();
  }

  @Query('Professional')
  findOne(@Args('id') id: number) {
    return this.ProfessionalService.findOne(id);
  }

  @Mutation('updateProfessional')
  update(
    @Args('updateProfessionalInput')
    updateProfessionalInput: UpdateProfessionalInput,
  ) {
    return this.ProfessionalService.update(
      updateProfessionalInput.id,
      updateProfessionalInput,
    );
  }

  @Mutation('removeProfessional')
  remove(@Args('id') id: number) {
    return this.ProfessionalService.remove(id);
  }
}
