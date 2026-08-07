import { Router } from 'express';
import { registrarController, loginController, perfilController, refreshController } from '../controllers/auth.controller';
import { autenticar } from '../middlewares/auth.middleware';
import { validar } from '../middlewares/validacao.middleware';
import { criarUsuarioSchema, loginSchema } from '../validators/usuario.validator';
import { limiteAuth } from '../middlewares/rateLimit.middleware';


const router = Router();

router.post('/registrar', limiteAuth, validar(criarUsuarioSchema), registrarController);
router.post('/login', limiteAuth, validar(loginSchema), loginController);
router.get('/perfil', autenticar, perfilController);
router.post('/refresh', refreshController);



export default router;