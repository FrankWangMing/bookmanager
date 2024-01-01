/*
  Warnings:

  - You are about to drop the `Travel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Travel" DROP CONSTRAINT "Travel_authorId_fkey";

-- DropTable
DROP TABLE "Travel";
