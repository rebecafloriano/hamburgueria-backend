import { prisma } from '../config/prisma';

export function listarProdutosDisponiveis() {
    return prisma.produto.findMany({ where: { disponivel: true } });
}


export function buscarProdutoPorId(id: string) {
    return prisma.produto.findUnique({ where: { id } });
}

export function criarProduto(dados: {
    nome: string;
    descricao: string;
    preco: number;
    imagemUrl?: string;
}) {
    return prisma.produto.create({ data: dados });
}

export function atualizarProduto(
    id: string,
    dados: Partial<{ nome: string; descricao: string; preco: number; imagemUrl: string; disponivel: boolean }>
) {
    return prisma.produto.update({ where: { id }, data: dados });
}

export function desativarProduto(id: string) {
    return prisma.produto.update({ where: { id }, data: { disponivel: false } });
}