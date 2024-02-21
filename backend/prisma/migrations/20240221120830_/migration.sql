-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "bookNumber" TEXT NOT NULL,
    "supplierCode" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "publish" TEXT,
    "discount" TEXT,
    "stock" TEXT,
    "author" TEXT,
    "printTime" TEXT,
    "readership" TEXT,
    "classification" TEXT,
    "address" TEXT,
    "format" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookNumber_supplierCode" PRIMARY KEY ("bookNumber","supplierCode")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_code_key" ON "Supplier"("code");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_supplierCode_fkey" FOREIGN KEY ("supplierCode") REFERENCES "Supplier"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
