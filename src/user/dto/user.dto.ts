import { Field, InputType, Float } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true }) // Indica que el campo es opcional
  name?: string;

  @Field(() => Float, { nullable: true }) // Indica que el campo es opcional y de tipo Float en GraphQL
  price?: number;

  @Field({ nullable: true }) // Indica que el campo es opcional
  description?: string;

  @Field(() => Boolean, { nullable: true }) // Indica que el campo es opcional y de tipo Boolean en GraphQL
  isActive?: boolean;
}
