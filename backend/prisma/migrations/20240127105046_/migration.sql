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
    "name" TEXT NOT NULL,
    "publish" TEXT NOT NULL,
    "discount" TEXT NOT NULL,
    "stock" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "printTime" TEXT NOT NULL,
    "readership" TEXT NOT NULL,
    "classification" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("bookNumber")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_code_key" ON "Supplier"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Book_bookNumber_key" ON "Book"("bookNumber");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_supplierCode_fkey" FOREIGN KEY ("supplierCode") REFERENCES "Supplier"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
