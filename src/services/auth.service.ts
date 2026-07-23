import bcrypt from 'bcrypt';
import { criarUsuario, buscarUsuarioPorEmail } from '../repositories/usuario.repository';
import { gerarAccessToken, gerarRefreshToken, verificarRefreshToken } from '../utils/jwt';
import { criarCarrinho } from '../repositories/carrinho.repository';

const SALT_ROUNDS = 10;

export async function registrar(dados: {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
}) {
    const usuarioExistente = await buscarUsuarioPorEmail(dados.email);
    if (usuarioExistente) {
        throw new Error('Email já cadastrado');
    }

    const senhaHash = await bcrypt.hash(dados.senha, SALT_ROUNDS);
    const usuario = await criarUsuario({ ...dados, senha: senhaHash });

    await criarCarrinho(usuario.id)

    return { id: usuario.id, nome: usuario.nome, email: usuario.email };
}

export async function login(email: string, senha: string) {
    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) {
        throw new Error('Credenciais inválidas');
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
        throw new Error('Credenciais inválidas');
    }

    const accessToken = gerarAccessToken(usuario.id, usuario.role);
    const refreshToken = gerarRefreshToken(usuario.id, usuario.role);

    return {
        accessToken,
        refreshToken,
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    };
}

export function renovarToken(refreshToken: string) {
    let payload;

    try {
        payload = verificarRefreshToken(refreshToken);
    } catch {
        throw new Error('Refresh token inválido ou expirado');
    }

    return { accessToken: gerarAccessToken(payload.sub, payload.role) };
}