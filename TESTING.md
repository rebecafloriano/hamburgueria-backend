# Testes — Hamburgueria API

Este documento resume a estratégia de testes aplicada ao projeto, como parte do processo de QA conduzido em paralelo ao desenvolvimento.

## Estratégia

- **Tipos de teste aplicados:** funcional, caixa-preta, manual/exploratório.
- **Técnicas de design de caso:** particionamento de equivalência (campos de formato, como `email` e `nome`) e análise de valor-limite (campos com tamanho definido, como `senha` e `telefone`).
- **Ferramentas usadas:** Postman (execução manual dos casos de teste), Vitest + Supertest (automação — em andamento).

## Cobertura atual

| Módulo | Status |
| --- | --- |
| Autenticação (`/auth`) | Completo — casos de teste, execução manual e bug reports |
| Cardápio (`/produtos`) | Pendente |
| Carrinho (`/carrinho`) | Pendente |
| Pedidos (`/pedidos`) | Pendente |
| Pagamento (`/pedidos/:id/pagamento`, `/webhooks/stripe`) | Pendente |

## Bugs encontrados

Os defeitos confirmados durante a execução dos testes estão documentados como [Issues](../../issues) no repositório, com a label `bug`. Dúvidas de design em aberto usam a label `question`.

## Documentação detalhada

O processo completo de QA (plano de testes, casos de teste desenhados e execução com resultado real) está documentado no Notion:

- [Plano de Testes — Hamburgueria API](https://splashy-neem-746.notion.site/Plano-de-Testes-Hamburgueria-API-3b8a3d40369280559b3edfe2bc1b17ad?pvs=73)
- [Casos de Teste — Hamburgueria API](https://splashy-neem-746.notion.site/Casos-de-Teste-Hamburgueria-API-3b8a3d4036928074983acedaf9de6508)
- [Bug Report — Hamburgueria API](https://splashy-neem-746.notion.site/Bug-Report-Hamburgueria-API-3baa3d40369280aaa3c4d0276e578010)