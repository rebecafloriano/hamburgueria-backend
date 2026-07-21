import { prisma } from '../config/prisma';

export function criarUsuario(dados: {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
}) {
    return prisma.usuario.create({ data: dados });
}

export function buscarUsuarioPorEmail(email: string) {
    return prisma.usuario.findUnique({ where: { email } });
}