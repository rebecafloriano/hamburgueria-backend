import { z } from 'zod'

export const criarUsuarioSchema = z.object({
    nome: z.string().trim().regex(/^[\p{L}\s]+$/u, 'Formato inválido'),
    email: z.string().trim().toLowerCase().pipe(z.email('Email inválido')),
    senha: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
    telefone: z.string().regex(/^\d{11}$/, 'Formato de telefone inválido')
})