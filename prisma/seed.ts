import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.produto.createMany({
        data: [
            { nome: 'X-Burger', descricao: 'Hambúrguer, queijo, alface e tomate', preco: 18.9 },
            { nome: 'X-Bacon', descricao: 'Hambúrguer, queijo, bacon, alface e tomate', preco: 22.9 },
            { nome: 'X-Salada', descricao: 'Hambúrguer, queijo, alface, tomate e maionese especial', preco: 19.9 },
        ],
    });
}

main()
    .then(() => console.log('Seed concluído.'))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });