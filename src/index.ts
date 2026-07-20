
import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
});
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});