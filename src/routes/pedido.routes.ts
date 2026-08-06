import { Router } from 'express'
import {
    buscarController,
    finalizarController,
    listarController,
    statusController
} from '../controllers/pedido.controller'
 
import { autorizar } from '../middlewares/autorizacao.middleware'
import { autenticar } from '../middlewares/auth.middleware'
import { validar } from '../middlewares/validacao.middleware'
import { atualizarStatusSchema, finalizarPedidoSchema } from '../validators/pedido.validator'

const router = Router()

router.post('/', autenticar, validar(finalizarPedidoSchema), finalizarController)
router.get('/', autenticar, listarController)
router.get('/:id', autenticar, buscarController)
router.put('/:id/status', autenticar, autorizar('ADMIN'), validar(atualizarStatusSchema), statusController)

export default router