import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import config from './config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GraphqlModule } from './graphql/graphql.module';
import { ServiceModule } from './service/service.module';
import { ProfessionalModule } from './service-provider/service-provider.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    UserModule,
    AuthModule,
    GraphqlModule,
    ServiceModule,
    ProfessionalModule,
    BookingModule,
  ],
})
export class AppModule {}
