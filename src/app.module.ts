import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ServiceModule } from './service/service.module';
import { BookingModule } from './booking/booking.module';
import { ProfessionalModule } from './professional/professional.module';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import config from './config';
import { GraphQLModule } from '@nestjs/graphql';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      playground: true,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    UserModule,
    AuthModule,
    ServiceModule,
    ProfessionalModule,
    BookingModule,
  ],
})
export class AppModule {}
