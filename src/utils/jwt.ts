import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

type PayloadToken = { sub: string; role: string };

export function gerarAccessToken(usuarioId: string, role: string) {
    return jwt.sign({ sub: usuarioId, role }, env.jwt.secret, {
        expiresIn: env.jwt.accessExpiresIn as NonNullable<SignOptions['expiresIn']>,
    });
}

export function gerarRefreshToken(usuarioId: string, role: string) {
    return jwt.sign({ sub: usuarioId, role }, env.jwt.refreshSecret, {
        expiresIn: env.jwt.refreshExpiresIn as NonNullable<SignOptions['expiresIn']>,
    });
}

export function verificarAccessToken(token: string) {
    return jwt.verify(token, env.jwt.secret) as PayloadToken;
}

export function verificarRefreshToken(token: string) {
    return jwt.verify(token, env.jwt.refreshSecret) as PayloadToken;
}