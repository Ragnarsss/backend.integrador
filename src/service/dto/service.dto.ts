import { Field, InputType, Float } from '@nestjs/graphql';

@InputType()
export class CreateServiceInput {
  @Field() // Indica que es un campo de entrada en GraphQL
  name: string;

  @Field(() => Float) // Indica que es un campo de tipo Float en GraphQL
  price: number;

  @Field()
  description: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field()
  professionalId: string; // Aquí asumo que se proporcionará el ID del profesional al crear el servicio
}

@InputType()
export class UpdateServiceInput {
  @Field({ nullable: true }) // Indica que el campo es opcional
  name?: string;

  @Field(() => Float, { nullable: true }) // Indica que el campo es opcional y de tipo Float en GraphQL
  price?: number;

  @Field({ nullable: true }) // Indica que el campo es opcional
  description?: string;

  @Field(() => Boolean, { nullable: true }) // Indica que el campo es opcional y de tipo Boolean en GraphQL
  isActive?: boolean;
}
