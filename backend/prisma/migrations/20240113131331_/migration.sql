/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
ALTER COLUMN "bookNumber" SET DATA TYPE TEXT,
ALTER COLUMN "discount" SET DATA TYPE TEXT,
ALTER COLUMN "stock" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET DATA TYPE TEXT,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("bookNumber");
