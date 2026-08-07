import { ErroAplicacao } from '../errors/ErroAplicacao';
import {
    listarProdutosDisponiveis,
    buscarProdutoPorId,
    criarProduto,
    atualizarProduto,
    desativarProduto,
} from '../repositories/produto.repository';

export function listarCardapio() {
    return listarProdutosDisponiveis();
}

export function criar(dados: {
    nome: string;
    descricao: string;
    preco: number;
    imagemUrl?: string;
}) {
    return criarProduto(dados);
}

export async function atualizar(
    id: string,
    dados: Partial<{ nome: string; descricao: string; preco: number; imagemUrl: string; disponivel: boolean }>
) {
    const produto = await buscarProdutoPorId(id);
    if (!produto) {
        throw new ErroAplicacao('Produto não encontrado', 404);
    }
    return atualizarProduto(id, dados);
}

export async function desativar(id: string) {
    const produto = await buscarProdutoPorId(id);
    if (!produto) {
        throw new ErroAplicacao('Produto não encontrado', 404);
    }
    return desativarProduto(id);
}