import { Request, Response, NextFunction } from 'express';
import { verificarAccessToken } from '../utils/jwt';

export function autenticar(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ mensagem: 'Token não fornecido' });
        return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ mensagem: 'Token não fornecido' });
        return;
    }

    try {
        const payload = verificarAccessToken(token);
        req.usuarioId = payload.sub;
        next();
    } catch (error) {
        res.status(401).json({ mensagem: 'Token inválido ou expirado' });
    }
}