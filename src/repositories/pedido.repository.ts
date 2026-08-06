import { prisma } from '../config/prisma'
import { StatusPedido } from '../generated/prisma/enums'

export function criarPedidoComItens(dados: {
    usuarioId: string,
    carrinhoId: string,
    enderecoEntrega: string,
    total: number,
    itens: { produtoId: string, quantidade: number, precoUnitario: number }[]

}) {

    return prisma.$transaction(async (tx) => {
        const pedido = await tx.pedido.create({
            data: {
                usuarioId: dados.usuarioId,
                enderecoEntrega: dados.enderecoEntrega,
                total: dados.total
            }
        })

        await tx.itemPedido.createMany({
            data: dados.itens.map((item) => ({
                pedidoId: pedido.id,
                produtoId: item.produtoId,
                quantidade: item.quantidade,
                precoUnitario: item.precoUnitario
            }))
        })

        await tx.itemCarrinho.deleteMany({
            where: { carrinhoId: dados.carrinhoId },
        })
        return pedido
    })



}

export function buscarPedidoPorId(id: string) {
    return prisma.pedido.findUnique({
        where: { id },
        include: {
            usuario: {
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    telefone: true,
                    role: true,
                },
            },
            itens: {
                include: {
                    produto: true
                }
            }
        }
    }
    )
}

export function listarPedidosPorUsuario(usuarioId: string) {
    return prisma.pedido.findMany({
        where: { usuarioId },
        include: {
            itens: {
                include: {
                    produto: true
                }
            }
        }
    })
}

export function atualizarStatus(id: string, status: StatusPedido) {
    return prisma.pedido.update({
        where: { id },
        data: { status }
    })
}