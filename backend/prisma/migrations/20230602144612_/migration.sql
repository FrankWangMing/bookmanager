/*
  Warnings:

  - Added the required column `title` to the `Travel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Travel" ADD COLUMN     "content" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
