import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  userName: string;

  @Field()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  ProfessionalId: string;

  @Field(() => Professional, { nullable: true })
  Professional: Professional;
}

@ObjectType()
export class Professional {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  phone: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => User, { nullable: true })
  user: User;

  @Field()
  userId: string;

  @Field(() => [Service])
  services: Service[];
}

@ObjectType()
export class Service {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Professional, { nullable: true })
  Professional: Professional;

  @Field()
  ProfessionalId: string;
}
