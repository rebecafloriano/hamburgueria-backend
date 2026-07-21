import { z } from 'zod';

const envSchema = z.object({
    PORT: z.string().optional(),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL é obrigatório'),
    JWT_SECRET: z.string().min(1, 'JWT_SECRET é obrigatório'),
    JWT_REFRESH_SECRET: z.string().min(1, 'JWT_REFRESH_SECRET é obrigatório'),
    JWT_ACCESS_EXPIRES_IN: z.string().optional(),
    JWT_REFRESH_EXPIRES_IN: z.string().optional(),
});

export const envValidado = envSchema.parse(process.env);