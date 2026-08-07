import express from 'express';
import healthRoutes from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import produtoRoutes from './routes/produto.routes';
import carrinhoRoutes from './routes/carrinho.routes'
import pedidoRoutes from './routes/pedido.routes'
import { tratarErro } from './middlewares/erro.middleware';
import helmet from 'helmet';
import {env} from './config/env';
import cors from 'cors'


const app = express();

app.use(helmet())
app.use(express.json());
app.use(cors({ origin: env.frontendUrl }))


app.use('/health', healthRoutes);
app.use('/auth', authRoutes);
app.use('/produtos', produtoRoutes);
app.use('/carrinho', carrinhoRoutes)
app.use('/pedidos', pedidoRoutes)

app.use(tratarErro)

export default app;
