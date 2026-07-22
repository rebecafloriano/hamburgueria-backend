import express from 'express';
import healthRoutes from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import produtoRoutes from './routes/produto.routes';



const app = express();

app.use(express.json());

app.use('/health', healthRoutes);
app.use('/auth', authRoutes);
app.use('/produtos', produtoRoutes);

export default app;
