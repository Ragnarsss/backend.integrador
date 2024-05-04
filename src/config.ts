import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      dbName: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
    },
    jwt: {
      loginSecret: process.env.JWT_LOGIN_SECRET,
      loginTokenExpiresIn: parseInt(process.env.JWT_LOGIN_EXPIRES_IN, 10),
      refreshTokenExpiresIn: parseInt(
        process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
        10,
      ),
      refreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    },
  };
});
