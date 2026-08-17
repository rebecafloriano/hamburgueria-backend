# Hamburgueria API

API REST para gerenciamento de pedidos de uma hamburgueria: autenticação de usuários, cardápio, carrinho de compras, pedidos e pagamento integrado com Stripe.

## Tecnologias

- **Node.js** + **Express 5**
- **TypeScript**
- **PostgreSQL** + **Prisma ORM** (via `@prisma/adapter-pg`)
- **JWT** (access token + refresh token)
- **bcrypt** (hash de senha)
- **Zod** (validação de dados de entrada)
- **Stripe** (pagamentos e webhooks)
- **Helmet**, **CORS**, **express-rate-limit** (segurança)
- **Vitest** + **Supertest** (testes automatizados)

## Funcionalidades

- **Autenticação:** registro, login, perfil, refresh token
- **Cardápio:** consulta de produtos
- **Carrinho:** criação automática no cadastro, gerenciamento de itens
- **Pedidos:** criação e acompanhamento
- **Pagamento:** checkout via Stripe e webhook de confirmação

## Testes e Qualidade

Este projeto segue um processo de QA estruturado, aplicado de ponta a ponta no módulo de **Autenticação** como estudo de caso completo:

1. **Plano de testes** — escopo, estratégia e critérios definidos antes da execução.
2. **Casos de teste** — desenhados com técnicas de particionamento de equivalência e análise de valor-limite.
3. **Execução manual** — via Postman, comparando resultado esperado x resultado real.
4. **Bug reports** — defeitos encontrados, classificados por severidade e prioridade.
5. **Rastreamento público** — bugs formalizados como [Issues](../../issues) no GitHub (label `bug`), todas corrigidas e fechadas com referência ao commit da correção.
6. **Automação** — suíte de regressão com Vitest + Supertest, cobrindo casos felizes, validações e os bugs encontrados (garantindo que não voltem a ocorrer).

### Cobertura atual

| Módulo | Status |
| --- | --- |
| Autenticação (`/auth`) | Completo — casos de teste, execução manual, bug reports e automação |
| Cardápio (`/produtos`) | Pendente |
| Carrinho (`/carrinho`) | Pendente |
| Pedidos (`/pedidos`) | Pendente |
| Pagamento (`/pedidos/:id/pagamento`, `/webhooks/stripe`) | Pendente |

Detalhes completos do processo (plano, casos de teste e execução) estão documentados em [`TESTING.md`](./TESTING.md) e no Notion.

### Rodando os testes automatizados

`
npm test
`

Suíte atual (`src/tests/auth.test.ts`) — 11 testes, cobrindo `POST /auth/registrar`, `POST /auth/login` e `POST /auth/refresh`:

```
✓ POST /auth/registrar (6)
✓ POST /auth/login (3)
✓ POST /auth/refresh (2)

Test Files  1 passed (1)
     Tests  11 passed (11)
```

## Estrutura do projeto

```
src/
├── config/         # configuração (Prisma, env)
├── controllers/     # camada de entrada HTTP
├── services/         # regras de negócio
├── validators/       # schemas Zod
├── middlewares/       # autenticação, rate limit, validação
├── routes/            # definição de rotas
├── tests/              # testes automatizados (Vitest + Supertest)
├── app.ts              # instância do Express (exportada para testes)
└── index.ts            # ponto de entrada (app.listen)
```

## Como rodar localmente

```bash
git clone https://github.com/rebecafloriano/hamburgueria-backend.git
cd hamburgueria-backend
npm install
```

Crie um arquivo `.env` na raiz com as variáveis necessárias (ajuste os nomes conforme `src/config/env.ts`):

```
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_EXPIRES_IN=
JWT_REFRESH_EXPIRES_IN=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
PORT=
```

Depois:

```bash
npx prisma migrate dev
npm run dev
```

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Sobe o servidor em modo desenvolvimento |
| `npm run build` | Compila o TypeScript |
| `npm start` | Roda a build de produção |
| `npm test` | Executa os testes automatizados (Vitest) |
| `npm run lint` | Roda o ESLint |
| `npm run format` | Formata o código com Prettier |

## Licença

ISC
