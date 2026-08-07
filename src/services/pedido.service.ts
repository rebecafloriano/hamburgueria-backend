import {
    criarPedidoComItens,
    buscarPedidoPorId,
    listarPedidosPorUsuario,
    atualizarStatus as atualizarStatusNoBanco
} from "../repositories/pedido.repository";
import { buscarCarrinho } from "./carrinho.service";
import { StatusPedido } from "../generated/prisma/enums";
import { Endereco } from "../validators/pedido.validator";
import { ErroAplicacao } from "../errors/ErroAplicacao";

const transicoesPermitidas: Record<StatusPedido, StatusPedido[]> = {
    PENDENTE: ['EM_PREPARO', 'CANCELADO'],
    EM_PREPARO: ['SAIU_PARA_ENTREGA', 'CANCELADO'],
    SAIU_PARA_ENTREGA: ['ENTREGUE'],
    ENTREGUE: [],
    CANCELADO: []
}

export async function buscarPedidoUsuario(id: string, usuarioId: string) {
    const pedido = await buscarPedidoPorId(id)

    if (!pedido) {
        throw new ErroAplicacao('Pedido não encontrado', 404)
    }

    if (pedido.usuarioId !== usuarioId) {
        throw new ErroAplicacao('Pedido não encontrado', 404)
    }
    return pedido
}

export function listarPedidos(usuarioId: string) {
    return listarPedidosPorUsuario(usuarioId)
}

export async function finalizarPedido(
    usuarioId: string,
    enderecoEntrega: Endereco,) {
    const carrinho = await buscarCarrinho(usuarioId)

    if (!carrinho) {
        throw new ErroAplicacao('Carrinho não existe', 404)
    }
    if (carrinho.itens.length === 0) {
        throw new ErroAplicacao('Carrinho vazio', 400)
    }

    const total = carrinho.itens.reduce((acumulado, item) => {
        return acumulado + (item.quantidade * item.produto.preco.toNumber())
    }, 0)

    const itemFormatado = carrinho.itens.map((item) => ({
        produtoId: item.produtoId,
        quantidade: item.quantidade,
        precoUnitario: item.produto.preco.toNumber()

    }))

    return criarPedidoComItens({ usuarioId, carrinhoId: carrinho.id, enderecoEntrega, total, itens: itemFormatado })
}

export async function atualizarStatus(id: string, novoStatus: StatusPedido) {
    const pedido = await buscarPedidoPorId(id)

    if (!pedido) {
        throw new ErroAplicacao('Pedido não encontrado', 404)
    }

    const permitido = transicoesPermitidas[pedido.status].includes(novoStatus)

    if (!permitido) {
        throw new ErroAplicacao(`Não é possível mudar de ${pedido.status} para ${novoStatus}`, 400)
    }

    return atualizarStatusNoBanco(id, novoStatus)

}