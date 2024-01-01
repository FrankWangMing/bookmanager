/*
  Warnings:

  - Made the column `supplierCode` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_supplierCode_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "supplierCode" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_supplierCode_fkey" FOREIGN KEY ("supplierCode") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
