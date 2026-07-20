import express from 'express'
import healthRoutes from './routes/health.routes'

console.log('[carregamento] app.ts');
const app = express();

app.use('/health', healthRoutes)

export default app