import { z } from 'zod'
import { StatusPedido } from '../generated/prisma/enums'


export const finalizarPedidoSchema = z.object({
    enderecoEntrega: z.string().min(1, 'Endereço de entrega é obrigatório'),
})

export const atualizarStatusSchema = z.object({
    status: z.enum(StatusPedido),
})