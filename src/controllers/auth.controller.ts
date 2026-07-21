import { Request, Response } from 'express';
import { registrar, login, renovarToken } from '../services/auth.service';

export async function registrarController(req: Request, res: Response) {
    try {
        const usuario = await registrar(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ mensagem: (error as Error).message });
    }
}

export async function loginController(req: Request, res: Response) {
    try {
        const { email, senha } = req.body;
        const resultado = await login(email, senha);
        res.json(resultado);
    } catch (error) {
        res.status(401).json({ mensagem: (error as Error).message });
    }
}

export function perfilController(req: Request, res: Response) {
    res.json({ usuarioId: req.usuarioId });
}

export function refreshController(req: Request, res: Response) {
    try {
        const { refreshToken } = req.body;
        const resultado = renovarToken(refreshToken);
        res.json(resultado);
    } catch (error) {
        res.status(401).json({ mensagem: (error as Error).message });
    }
}