/*
  Warnings:

  - You are about to drop the column `printTime` on the `Book` table. All the data in the column will be lost.
  - Added the required column `print_time` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "printTime",
ADD COLUMN     "print_time" TEXT NOT NULL;
