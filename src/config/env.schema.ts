import { z } from 'zod';

const envSchema = z.object({
    PORT: z.string().optional(),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL é obrigatório'),
    JWT_SECRET: z.string().min(1, 'JWT_SECRET é obrigatório'),
    JWT_REFRESH_SECRET: z.string().min(1, 'JWT_REFRESH_SECRET é obrigatório'),
    JWT_ACCESS_EXPIRES_IN: z.string().optional(),
    JWT_REFRESH_EXPIRES_IN: z.string().optional(),
    UF_PADRAO: z.enum(["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
        "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
        "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]),
    FRONTEND_URL: z.string().optional(),
    STRIPE_SECRET_KEY: z.string().min(1, 'Precisa ter pelo menos um caractere'),
    STRIPE_WEBHOOK_SECRET: z.string().min(1, 'Precisa ter pelo menos um caractere')
});

export const envValidado = envSchema.parse(process.env);