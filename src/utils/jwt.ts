import jwt, {type SignOptions} from 'jsonwebtoken';
import { env } from '../config/env';

export function gerarAccessToken(usuarioId: string) {
    return jwt.sign({ sub: usuarioId }, env.jwt.secret, {
        expiresIn: env.jwt.accessExpiresIn as NonNullable<SignOptions['expiresIn']>,
    });
}

export function gerarRefreshToken(usuarioId: string) {
    return jwt.sign({ sub: usuarioId }, env.jwt.refreshSecret, {
        expiresIn: env.jwt.refreshExpiresIn as NonNullable<SignOptions['expiresIn']>,
    });
}

export function verificarAccessToken(token: string) {
    return jwt.verify(token, env.jwt.secret) as { sub: string };
}

export function verificarRefreshToken(token: string) {
    return jwt.verify(token, env.jwt.refreshSecret) as { sub: string };
}