import { Router } from 'express'

import { getHealth } from '../controllers/health.controller'
console.log('[carregamento] health.routes.ts');

const router = Router()

router.get('/', getHealth)

export default router