import { Request, Response, NextFunction } from 'express';

export function autorizar(...papeisPermitidos: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.usuarioRole || !papeisPermitidos.includes(req.usuarioRole)) {
            res.status(403).json({ mensagem: 'Acesso negado' });
            return;
        }
        next();
    };
}