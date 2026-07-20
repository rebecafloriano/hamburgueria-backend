
import app from './app'
import { env } from './config/env'
console.log('[carregamento] index.ts');




app.listen(env.port, () => {
    console.log(`Servidor rodando na porta ${env.port}`);
});