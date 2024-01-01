/*
  Warnings:

  - You are about to drop the column `print_time` on the `Book` table. All the data in the column will be lost.
  - The primary key for the `Supplier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `printTime` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_supplierCode_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "print_time",
ADD COLUMN     "printTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_pkey",
ADD CONSTRAINT "Supplier_pkey" PRIMARY KEY ("supplierCode");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_supplierCode_fkey" FOREIGN KEY ("supplierCode") REFERENCES "Supplier"("supplierCode") ON DELETE RESTRICT ON UPDATE CASCADE;
