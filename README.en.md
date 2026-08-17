# Hamburgueria API

[🇧🇷 Português](./README.md) | 🇺🇸 English

REST API for managing orders at a burger restaurant: user authentication, menu, shopping cart, orders, and payment integrated with Stripe.

## Tech Stack

- **Node.js** + **Express 5**
- **TypeScript**
- **PostgreSQL** + **Prisma ORM** (via `@prisma/adapter-pg`)
- **JWT** (access token + refresh token)
- **bcrypt** (password hashing)
- **Zod** (input validation)
- **Stripe** (payments and webhooks)
- **Helmet**, **CORS**, **express-rate-limit** (security)
- **Vitest** + **Supertest** (automated testing)

## Features

- **Authentication:** register, login, profile, refresh token
- **Menu:** browse products
- **Cart:** automatically created on signup, item management
- **Orders:** creation and tracking
- **Payment:** Stripe checkout and webhook confirmation

## Testing and Quality

This project follows a structured QA process, applied end-to-end on the **Authentication** module as a full case study:

1. **Test plan** — scope, strategy, and criteria defined before execution.
2. **Test cases** — designed using equivalence partitioning and boundary value analysis.
3. **Manual execution** — via Postman, comparing expected vs. actual results.
4. **Bug reports** — defects found, classified by severity and priority.
5. **Public tracking** — bugs formalized as [Issues](../../issues) on GitHub (`bug` label), all fixed and closed with a reference to the fixing commit.
6. **Automation** — regression suite with Vitest + Supertest, covering happy paths, validations, and the bugs found (preventing regressions).

### Current Coverage

| Module | Status |
| --- | --- |
| Authentication (`/auth`) | Complete — test cases, manual execution, bug reports, and automation |
| Menu (`/produtos`) | Pending |
| Cart (`/carrinho`) | Pending |
| Orders (`/pedidos`) | Pending |
| Payment (`/pedidos/:id/pagamento`, `/webhooks/stripe`) | Pending |

Full process details (plan, test cases, and execution) are documented in [`TESTING.md`](./TESTING.md) and on Notion.

### Running the automated tests

```bash
npm test
```

Current suite (`src/tests/auth.test.ts`) — 11 tests, covering `POST /auth/registrar`, `POST /auth/login`, and `POST /auth/refresh`:

```
✓ POST /auth/registrar (6)
✓ POST /auth/login (3)
✓ POST /auth/refresh (2)

Test Files  1 passed (1)
     Tests  11 passed (11)
```

## Project Structure

```
src/
├── config/         # configuration (Prisma, env)
├── controllers/     # HTTP entry layer
├── services/         # business logic
├── validators/       # Zod schemas
├── middlewares/       # auth, rate limit, validation
├── routes/            # route definitions
├── tests/              # automated tests (Vitest + Supertest)
├── app.ts              # Express instance (exported for tests)
└── index.ts            # entry point (app.listen)
```

## Running Locally

```bash
git clone https://github.com/rebecafloriano/hamburgueria-backend.git
cd hamburgueria-backend
npm install
```

Create a `.env` file at the root with the required variables (match the names to `src/config/env.ts`):

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

Then:

```bash
npx prisma migrate dev
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the server in development mode |
| `npm run build` | Compiles TypeScript |
| `npm start` | Runs the production build |
| `npm test` | Runs the automated tests (Vitest) |
| `npm run lint` | Runs ESLint |
| `npm run format` | Formats code with Prettier |

## License

ISC
