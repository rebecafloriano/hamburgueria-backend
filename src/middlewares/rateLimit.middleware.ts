import rateLimit from "express-rate-limit";

export const limiteGeral = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { mensagem: 'Muitas requisições. Tente novamente mais tarde.' }
}) 

export const limiteAuth = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { mensagem: 'Muitas tentativas. Tente novamente mais tarde.' }
}) 