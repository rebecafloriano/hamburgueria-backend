import { z } from 'zod'
import { StatusPedido } from '../generated/prisma/enums'

const enderecoEntregaSchema = z.object({
    rua: z.string().trim().min(2, 'Rua precisa ter mais que 2 caracteres'),
    numero: z.string().trim().min(1, 'Campo obrigatório'),
    complemento: z.string().trim().optional(),
    cep: z.string().trim().regex(/^\d{8}$/, 'CEP inválido'),
    bairro: z.string().trim().min(2, 'Bairro precisa conter pelo menos 2 caracteres'),
    cidade: z.string().trim().min(2, 'Cidade precisa conter pelo menos 2 caracteres'),
})
export const finalizarPedidoSchema = z.object({
    enderecoEntrega: enderecoEntregaSchema,
})

export type Endereco = z.infer<typeof enderecoEntregaSchema>

export const atualizarStatusSchema = z.object({
    status: z.enum(StatusPedido),
})