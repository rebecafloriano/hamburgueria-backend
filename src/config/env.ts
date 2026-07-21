import 'dotenv/config';
import { envValidado } from './env.schema';

export const env = {
  port: process.env.PORT || 3000,
  databaseUrl: envValidado.DATABASE_URL,
  jwt: {
    secret: envValidado.JWT_SECRET as string,
    refreshSecret: envValidado.JWT_REFRESH_SECRET as string,
    accessExpiresIn: envValidado.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn: envValidado.JWT_REFRESH_EXPIRES_IN || '7d',
  },
};
