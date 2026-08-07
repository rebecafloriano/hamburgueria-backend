import { Request, Response } from "express";
import { stripe } from "../config/stripe";
import { env } from "../config/env";
import Stripe from "stripe";
import { atualizarStatus } from "../services/pedido.service";

export async function stripeWebHookController(req: Request, res: Response) {
    const assinatura = req.headers['stripe-signature']

    if (!assinatura) {
        res.status(400).json({ mensagem: 'Não tem assinatura' })
        return
    }
    try {
        const evento = stripe.webhooks.constructEvent(req.body, assinatura, env.stripeWebhookSecret)
        if (evento.type === 'checkout.session.completed') {
            const session = evento.data.object as Stripe.Checkout.Session
            const pedidoId = session.metadata?.pedidoId

            if (pedidoId) {
                await atualizarStatus(pedidoId, 'EM_PREPARO')
            }
        }

        res.status(200).json({ recebido: true })

    } catch {
        res.status(400).json({ mensagem: 'Assinatura inválida' })
    }



}