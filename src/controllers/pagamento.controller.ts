import { Request, Response } from "express";
import { criarSessaoPagamento } from "../services/pagamento.service";

export async function criarSessaoController(req: Request, res: Response) {

    if (!req.usuarioId) {
        res.status(401).json({ mensagem: 'Não autenticado' })
        return
    }
    if (!req.params.id || Array.isArray(req.params.id)) {
        res.status(400).json({ mensagem: 'Não encontrado' })
        return
    }

    const pagamento = await criarSessaoPagamento(req.params.id, req.usuarioId)
    res.status(201).json({url: pagamento.url});

}