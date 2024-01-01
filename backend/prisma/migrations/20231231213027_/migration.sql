/*
  Warnings:

  - You are about to drop the column `supplierId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `Code` on the `Supplier` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[supplierCode]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookNumber` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `classification` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `printTime` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publish` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readership` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplierCode` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_supplierId_fkey";

-- DropIndex
DROP INDEX "Supplier_Code_key";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "supplierId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "bookNumber" INTEGER NOT NULL,
ADD COLUMN     "classification" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "discount" INTEGER NOT NULL,
ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "printTime" TEXT NOT NULL,
ADD COLUMN     "publish" TEXT NOT NULL,
ADD COLUMN     "readership" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL,
ADD COLUMN     "supplierCode" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "Code",
ADD COLUMN     "supplierCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_supplierCode_key" ON "Supplier"("supplierCode");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_supplierCode_fkey" FOREIGN KEY ("supplierCode") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
