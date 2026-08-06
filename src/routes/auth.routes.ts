import { Router } from 'express';
import { registrarController, loginController, perfilController, refreshController } from '../controllers/auth.controller';
import { autenticar } from '../middlewares/auth.middleware';
import { validar } from '../middlewares/validacao.middleware';
import { criarUsuarioSchema, loginSchema } from '../validators/usuario.validator';


const router = Router();

router.post('/registrar', validar(criarUsuarioSchema), registrarController);
router.post('/login', validar(loginSchema), loginController);
router.get('/perfil', autenticar, perfilController);
router.post('/refresh', refreshController);



export default router;