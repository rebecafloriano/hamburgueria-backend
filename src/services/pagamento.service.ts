import { stripe } from "../config/stripe";
import { buscarPedidoUsuario } from "./pedido.service";
import { env } from "../config/env";
import { ErroAplicacao } from "../errors/ErroAplicacao";

export async function criarSessaoPagamento(pedidoId: string, usuarioId: string) {
    const pedido = await buscarPedidoUsuario(pedidoId, usuarioId)
    const valorEmCentavos = Math.round(pedido.total.toNumber() * 100)

    try {
        return stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: 'Pedido#' + pedido.id
                        },
                        unit_amount: valorEmCentavos
                    },
                    quantity: 1
                }
            ],
            success_url: env.frontendUrl,
            cancel_url: env.frontendUrl,
            metadata: {
                pedidoId: pedido.id
            }
        })
    } catch {
        throw new ErroAplicacao('Não foi possível processar o pagamento no momento', 502)
    }

    
}