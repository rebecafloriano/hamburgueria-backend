import { Request, Response } from "express";
import {
    buscarPedidoUsuario,
    listarPedidos,
    finalizarPedido,
    atualizarStatus

} from "../services/pedido.service";


export async function buscarController(req: Request, res: Response) {

    if (!req.usuarioId) {
        res.status(401).json({ mensagem: 'Não autenticado' })
        return
    }

    if (!req.params.id || Array.isArray(req.params.id)) {
        res.status(400).json({ mensagem: 'pedido nao encontrado' })
        return
    }

    try {
        const pedido = await buscarPedidoUsuario(req.params.id, req.usuarioId)
        res.json(pedido)
    } catch (error) {
        res.status(404).json({ mensagem: (error as Error).message })
    }
}

export async function finalizarController(req: Request, res: Response) {
    if (!req.usuarioId) {
        res.status(401).json({ mensagem: 'Não autenticado' })
        return
    }

    try {
        const pedido = await finalizarPedido(req.usuarioId, req.body.enderecoEntrega)
        res.status(201).json(pedido);
    } catch (error) {
        res.status(400).json({ mensagem: (error as Error).message })
    }
}

export async function listarController(req: Request, res: Response) {
    if (!req.usuarioId) {
        res.status(401).json({ mensagem: 'Não autenticado' })
        return
    }
    const pedido = await listarPedidos(req.usuarioId)
    res.json(pedido)

}

export async function statusController(req: Request, res: Response) {
    if (!req.params.id || Array.isArray(req.params.id)) {
        res.status(400).json({ mensagem: 'pedido nao encontrado' })
        return
    }

    try {
        const pedido = await atualizarStatus(req.params.id, req.body.status)
        res.json(pedido)
    } catch (error) {
        res.status(400).json({ mensagem: (error as Error).message })
    }
}