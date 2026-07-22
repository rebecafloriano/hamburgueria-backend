import { z } from 'zod';

export const criarProdutoSchema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    descricao: z.string().min(1, 'Descrição é obrigatória'),
    preco: z.number().positive('Preço deve ser maior que zero'),
    imagemUrl: z.string().url('URL de imagem inválida').optional(),
});

export const atualizarProdutoSchema = criarProdutoSchema.partial();