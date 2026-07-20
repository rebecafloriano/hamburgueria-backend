
import { Request, Response } from "express"
console.log('[carregamento] health.controller.ts');

export function getHealth(req: Request, res: Response) {
    console.log('[requisição] getHealth executado');
    res.json({ status: 'ok' })
}