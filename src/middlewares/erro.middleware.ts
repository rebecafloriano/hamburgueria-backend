import {
    Request, Response, NextFunction
} from 'express';
import { ErroAplicacao } from '../errors/ErroAplicacao';

export function tratarErro(err: unknown, req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ErroAplicacao) {
        res.status(err.statusCode).json({mensagem: err.message});
        return
    } else {
        console.error(err)
        res.status(500).json({mensagem: 'Erro interno'});
    }
}