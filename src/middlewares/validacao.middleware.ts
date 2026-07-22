import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export function validar(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const resultado = schema.safeParse(req.body);

        if (!resultado.success) {
            res.status(400).json({ mensagem: 'Dados inválidos', erros: resultado.error.issues });
            return;
        }

        req.body = resultado.data;
        next();
    };
}