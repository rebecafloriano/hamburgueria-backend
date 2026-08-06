/*
  Warnings:

  - You are about to drop the column `enderecoEntrega` on the `Pedido` table. All the data in the column will be lost.
  - Added the required column `bairro` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "enderecoEntrega",
ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "numero" TEXT NOT NULL,
ADD COLUMN     "rua" TEXT NOT NULL;
