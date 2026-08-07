import { Router } from "express";
import express from 'express'
import { stripeWebHookController } from "../controllers/webhook.controller"

const router = Router()

router.post('/stripe', express.raw({ type: 'application/json' }), stripeWebHookController)

export default router
