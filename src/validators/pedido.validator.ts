import { z } from 'zod'
import { StatusPedido } from '../generated/prisma/enums'

const enderecoEntregaSchema = z.object({
    rua: z.string({
        error: (issue) => issue.input === undefined ? 'Rua é obrigatória' : 'Rua inválida'
    }).trim().min(2, 'Rua precisa ter mais que 2 caracteres'),
    numero: z.string({
        error: (issue) => issue.input === undefined ? 'Número é obrigatório' : 'Número inválido'
    }).trim().min(1, 'Número é obrigatório'),
    complemento: z.string().trim().optional(),
    cep: z.string({
        error: (issue) => issue.input === undefined ? 'CEP é obrigatório' : 'CEP inválido'
    }).trim().regex(/^\d{8}$/, 'CEP inválido'),
    bairro: z.string({
        error: (issue) => issue.input === undefined ? 'Bairro é obrigatório' : 'Bairro inválido'
    }).trim().min(2, 'Bairro precisa conter pelo menos 2 caracteres'),
    cidade: z.string({
        error: (issue) => issue.input === undefined ? 'Cidade é obrigatória' : 'Cidade inválida'
    }).trim().min(2, 'Cidade precisa conter pelo menos 2 caracteres'),
})
export const finalizarPedidoSchema = z.object({
    enderecoEntrega: enderecoEntregaSchema,
})

export type Endereco = z.infer<typeof enderecoEntregaSchema>

export const atualizarStatusSchema = z.object({
    status: z.enum(StatusPedido),
})