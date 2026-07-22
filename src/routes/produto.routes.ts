import { Router } from 'express';
import {
    listarController,
    criarController,
    atualizarController,
    desativarController,
} from '../controllers/produto.controller';
import { autenticar } from '../middlewares/auth.middleware';
import { autorizar } from '../middlewares/autorizacao.middleware';
import { validar } from '../middlewares/validacao.middleware';
import { criarProdutoSchema, atualizarProdutoSchema } from '../validators/produto.validator';

const router = Router();

router.get('/', listarController);
router.post('/', autenticar, autorizar('ADMIN'), validar(criarProdutoSchema), criarController);
router.put('/:id', autenticar, autorizar('ADMIN'), validar(atualizarProdutoSchema), atualizarController);
router.delete('/:id', autenticar, autorizar('ADMIN'), desativarController);

export default router;