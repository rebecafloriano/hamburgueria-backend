import { Request, Response } from 'express';
import { listarCardapio, criar, atualizar, desativar } from '../services/produto.service';

export async function listarController(req: Request, res: Response) {
    const produtos = await listarCardapio();
    res.json(produtos);
}

export async function criarController(req: Request, res: Response) {
    const produto = await criar(req.body);
    res.status(201).json(produto);
}

export async function atualizarController(req: Request, res: Response) {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        res.status(400).json({ mensagem: 'ID não fornecido' });
        return;
    }

    try {
        const produto = await atualizar(id, req.body);
        res.json(produto);
    } catch (error) {
        res.status(404).json({ mensagem: (error as Error).message });
    }
}

export async function desativarController(req: Request, res: Response) {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
        res.status(400).json({ mensagem: 'ID não fornecido' });
        return;
    }

    try {
        await desativar(id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ mensagem: (error as Error).message });
    }
}