import { prisma } from '../config/prisma';

export function buscarCarrinhoPorUsuarioId(usuarioId: string) {
    return prisma.carrinho.findUnique({
        where: { usuarioId },
        include: {
            itens: {
                include: {
                    produto: true,
                },
            },
        },
    })
}

export function criarCarrinho(usuarioId: string) {
    return prisma.carrinho.create({ data: { usuarioId } })
}

export function adicionarItemAoCarrinho(dados: {
    carrinhoId: string,
    produtoId: string,
    quantidade: number
}) {
    return prisma.itemCarrinho.create({ data: dados })

}

export function atualizarItemDoCarrinho(
    id: string,
    quantidade: number
) {
    return prisma.itemCarrinho.update({ where: { id }, data: { quantidade } });
}

export function removerItemDoCarrinho(id: string) {
    return prisma.itemCarrinho.delete({ where: { id } })
}

