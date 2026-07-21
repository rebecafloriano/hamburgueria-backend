import { Router } from 'express';
import { registrarController, loginController, perfilController, refreshController } from '../controllers/auth.controller';
import { autenticar } from '../middlewares/auth.middleware';


const router = Router();

router.post('/registrar', registrarController);
router.post('/login', loginController);
router.get('/perfil', autenticar, perfilController);
router.post('/refresh', refreshController);



export default router;