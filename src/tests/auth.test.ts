import supertest from 'supertest'
import app from '../app'
import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { prisma } from '../config/prisma'



describe('POST /auth/registrar', () => {
    let email: string

    // cria um email novo a cada teste
    beforeEach(() => {
        email = `teste${Date.now()}@exemplo.com`
    })
    // Função para apagar os cadastros de teste do Banco de Dados
    afterEach(async () => {
        if (!email) return
        //Como o carrinho é criado no cadastro de usuário, preciso deletar o carrinho primeiro
        await prisma.carrinho.deleteMany({ where: { usuario: { email } } })
        await prisma.usuario.deleteMany({
            where: { email }
        })
    })


    it('deve criar um usuário com dados válidos, validando senha de 6 caracteres(no limite) criar um carrinho e retornar 201', async () => {

        const resposta = await supertest(app)
            .post('/auth/registrar')
            .send({
                nome: 'Teste Automatizado',
                email,
                senha: '123456',
                telefone: '12345678912'
            })

        const carrinho = await prisma.carrinho.findFirst({ where: { usuario: { email } } })

        expect(resposta.status).toBe(201)
        expect(resposta.body).toHaveProperty('id')
        expect(resposta.body.nome).toBe('Teste Automatizado')
        expect(resposta.body.email).toBe(email)
        expect(resposta.body).not.toHaveProperty('senha')
        expect(resposta.body).toHaveProperty('telefone')
        expect(carrinho).not.toBeNull()
    })

    it('Deve dar erro 400 ao tentar cadastrar usuário com uma senha de 5 caracteres (abaixo do mínimo que é 6, deve também dar a mensagem de erro correta)', async () => {


        const resposta = await supertest(app)
            .post('/auth/registrar')
            .send({
                nome: 'Teste Automatizado',
                email: email,
                senha: '12345',
                telefone: '12345678912'
            })

        expect(resposta.status).toBe(400)
        expect(resposta.body.erros).toContainEqual(
            expect.objectContaining({ message: 'A senha precisa ter no mínimo 6 caracteres' }))
    })

    it('Deve dar erro 400 com mensagem na lingua portuguesa ao criar usuário sem enviar o campo nome', async () => {
        const resposta = await supertest(app)
            .post('/auth/registrar')
            .send({
                email: email,
                senha: '123456',
                telefone: '12345678912'
            })

        expect(resposta.status).toBe(400)
        const erroNome = resposta.body.erros.find((erro: any) => erro.path.includes('nome'))
        expect(erroNome.message).not.toBe(
            'Invalid input: expected string, received undefined'
        )
    })

    it('Deve dar erro 400 com mensagem na lingua portuguesa ao criar usuário sem enviar o campo telefone', async () => {
        const resposta = await supertest(app)
            .post('/auth/registrar')
            .send({
                nome: 'TesteQA',
                email: email,
                senha: '123456'
            })

        expect(resposta.status).toBe(400)
        const erroTelefone = resposta.body.erros.find((erro: any) => erro.path.includes('telefone'))
        expect(erroTelefone.message).not.toBe(
            'Invalid input: expected string, received undefined'
        )
    })

    it('Deve dar erro 400 com mensagem na lingua portuguesa ao criar usuário sem enviar o campo email', async () => {
        const resposta = await supertest(app)
            .post('/auth/registrar')
            .send({
                nome: 'TesteQA',
                telefone: '12345678912',
                senha: '123456'
            })

        expect(resposta.status).toBe(400)
        const erroEmail = resposta.body.erros.find((erro: any) => erro.path.includes('email'))
        expect(erroEmail.message).not.toBe(
            'Invalid input: expected string, received undefined'
        )
    })

    it('Deve dar erro 400 com mensagem na lingua portuguesa ao criar usuário sem enviar o campo senha', async () => {
        const resposta = await supertest(app)
            .post('/auth/registrar')
            .send({
                nome: 'TesteQA',
                email: email,
                telefone: '12345678912'
            })

        expect(resposta.status).toBe(400)
        const erroSenha = resposta.body.erros.find((erro: any) => erro.path.includes('senha'))
        expect(erroSenha.message).not.toBe(
            'Invalid input: expected string, received undefined'
        )
    })
})

describe('POST /auth/login', () => {

    it('Deve dar Erro 400 ao fazer o login com campo email vazio "" ', async () => {

        const resposta = await supertest(app)
            .post('/auth/login')
            .send({
                email: '',
                senha: '123456'
            })

        expect(resposta.status).toBe(400)
    })

    it('Deve dar Sucesso ao preencher login com email existente com caractere caixa alta', async () => {
        const resposta = await supertest(app)
            .post('/auth/login')
            .send({
                email: 'Joao@teste.com',
                senha: '123456'
            })

        expect(resposta.status).toBe(200)
    })

    it('Deve dar Erro 400 ao fazer o login com campo email preenchido com espaço no meio "joao@teste .com" ', async () => {

        const resposta = await supertest(app)
            .post('/auth/login')
            .send({
                email: 'joao@teste .com',
                senha: '123456'
            })

        expect(resposta.status).toBe(400)
    })
})

describe('POST /auth/refresh', () => {

    it('Deve dar 200 e receber o novo accessToken ao enviar um refreshToken válido', async () => {
        const login = await supertest(app)
            .post('/auth/login')
            .send({
            email: 'joao@teste.com', senha:'123456'
            })
        console.log(login.status, login.body)
        
        const resposta = await supertest(app)
            .post('/auth/refresh')
            .send({ refreshToken: login.body.refreshToken })
        
        expect(resposta.status).toBe(200)
        expect(resposta.body).toHaveProperty('accessToken')
    })

    it('Deve dar Erro 401 - “RefreshToken não fornecido” com essa mensagem específica quando é enviado o campo RefreshToken vazio "', async () => {
        const resposta = await supertest(app)
            .post('/auth/refresh')
            .send({
                refreshToken: ''
            })
        
        expect(resposta.status).toBe(401)
        expect(resposta.body.mensagem).toBe('RefreshToken não fornecido')
    })
})