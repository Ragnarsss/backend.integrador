import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfessionalService } from './professional.service';
import { Prisma } from '@prisma/client';

@Resolver('Professional')
export class ProfessionalResolver {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Mutation('createProfessional')
  create(
    @Args('createProfessionalInput')
    createProfessionalInput: Prisma.ProfessionalCreateInput,
  ) {
    return this.professionalService.create(createProfessionalInput);
  }

  @Query('professional')
  findAll() {
    return this.professionalService.findAll();
  }

  @Query('professional')
  findOne(@Args('id') id: string) {
    return this.professionalService.findOne(id);
  }

  @Mutation('updateProfessional')
  update(
    @Args('updateProfessionalInput')
    updateProfessionalInput: Prisma.ProfessionalUpdateInput,
  ) {
    return this.professionalService.update(
      updateProfessionalInput.id as string,
      updateProfessionalInput,
    );
  }

  @Mutation('removeProfessional')
  remove(@Args('id') id: string) {
    return this.professionalService.remove(id);
  }
}
