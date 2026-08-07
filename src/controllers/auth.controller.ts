import { Request, Response } from 'express';
import { registrar, login, renovarToken } from '../services/auth.service';

export async function registrarController(req: Request, res: Response) {

    const usuario = await registrar(req.body);
    res.status(201).json(usuario);

}

export async function loginController(req: Request, res: Response) {

    const { email, senha } = req.body;
    const resultado = await login(email, senha);
    res.json(resultado);

}

export function perfilController(req: Request, res: Response) {
    res.json({ usuarioId: req.usuarioId });
}

export function refreshController(req: Request, res: Response) {

    const { refreshToken } = req.body;
    const resultado = renovarToken(refreshToken);
    res.json(resultado);

}