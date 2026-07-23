import app from './app';
import { env } from './config/env';

import { buscarCarrinhoPorUsuarioId } from './repositories/carrinho.repository';

buscarCarrinhoPorUsuarioId('1306b087-5efa-4792-9e2d-ad502487e9fd').then((resultado) => {
  console.log('Carrinho:', resultado);
});


app.listen(env.port, () => {
  console.log(`Servidor rodando na porta ${env.port}`);
});
