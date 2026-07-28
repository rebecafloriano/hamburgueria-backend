import { Request, Response } from 'express';
import {
    buscarCarrinho,
    adicionarItem,
    atualizarItem,
    removerItem 
} from '../services/carrinho.service';
  
export async function buscarController(req: Request, res: Response) {
    if (!req.usuarioId) {
        res.status(401).json({ mensagem: 'Não autenticado' })
        return
    }
    const carrinho = await buscarCarrinho(req.usuarioId)
    res.json(carrinho)
}

export async function adicionarController(req: Request, res: Response) {
    if (!req.usuarioId) {
        res.status(401).json({ mensagem: 'Não autenticado' })
        return
    }
    const carrinho = await adicionarItem({...req.body, usuarioId: req.usuarioId});
    res.status(201).json(carrinho);
}

export async function atualizarController(req: Request, res: Response) {
    if (!req.usuarioId) {
        res.status(401).json({ mensagem: 'Não autenticado' })
        return
    }

    try {
        const carrinho = await atualizarItem({...req.body, usuarioId: req.usuarioId});
        res.json(carrinho);
    } catch (error) {
        res.status(404).json({ mensagem: (error as Error).message });
    }
}

export async function removerController(req: Request, res: Response) {
    if (!req.usuarioId) {
        res.status(401).json({ mensagem: 'Não autenticado' })
        return
    }
    const { id } = req.params;
    
    if (!id || Array.isArray(id)) {
        res.status(400).json({ mensagem: 'ID não fornecido' });
        return;
    }

    try {
        await removerItem({usuarioId:req.usuarioId, produtoId:id});
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ mensagem: (error as Error).message });
    }
}