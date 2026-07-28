import { Router } from 'express';
import {
    buscarController,
    adicionarController,
    atualizarController,
    removerController
    
} from '../controllers/carrinho.controller';
 
import { autenticar } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', autenticar, buscarController);
router.post('/', autenticar, adicionarController);
router.put('/', autenticar, atualizarController);
router.delete('/:id', autenticar, removerController);

export default router;