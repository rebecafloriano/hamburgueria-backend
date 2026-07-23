import {
    buscarCarrinhoPorUsuarioId,
    criarCarrinho,
    adicionarItemAoCarrinho,
    atualizarItemDoCarrinho,
    removerItemDoCarrinho
} from "../repositories/carrinho.repository";



export function buscarCarrinho(usuarioId: string) {
    return buscarCarrinhoPorUsuarioId(usuarioId)
}

export async function adicionarItem(dados: {
    usuarioId: string,
    produtoId: string,
    quantidade: number
}) {

    const carrinho = await buscarCarrinhoPorUsuarioId(dados.usuarioId)

    if (!carrinho) {
        throw new Error('Carrinho não encontrado')
    }

    const itemExistente = carrinho.itens.find((item) => item.produtoId === dados.produtoId)

    if (itemExistente) {
        return atualizarItemDoCarrinho(itemExistente.id, itemExistente.quantidade + dados.quantidade)
    }
    return adicionarItemAoCarrinho({
        carrinhoId: carrinho.id,
        produtoId: dados.produtoId,
        quantidade: dados.quantidade
    })
}

export async function atualizarItem(
    dados: {
        usuarioId: string,
        produtoId: string,
        quantidade: number
    }) {
    const carrinho = await buscarCarrinhoPorUsuarioId(dados.usuarioId)

    if (!carrinho) {
        throw new Error('Carrinho não encontrado')
    }

    const itemExistente = carrinho.itens.find((item) => item.produtoId === dados.produtoId)

    if (!itemExistente) {
        throw new Error('Item não encontrado')
        
    }
    return atualizarItemDoCarrinho(itemExistente.id, dados.quantidade)
}

export async function removerItem(dados: {
    usuarioId: string,
    produtoId: string,
}) {
    const carrinho = await buscarCarrinhoPorUsuarioId(dados.usuarioId)

    if (!carrinho) {
        throw new Error('Carrinho não encontrado')
    }

    const itemExistente = carrinho.itens.find((item) => item.produtoId === dados.produtoId)

    if (!itemExistente) {
        throw new Error('Item não encontrado')

    }
    return removerItemDoCarrinho(itemExistente.id)
}