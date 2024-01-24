/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Admin` table. All the data in the column will be lost.
  - The primary key for the `UserCompany` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserCompany` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
DROP COLUMN "id",
ADD COLUMN     "admin_id" SERIAL NOT NULL,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("admin_id");

-- AlterTable
ALTER TABLE "UserCompany" DROP CONSTRAINT "UserCompany_pkey",
DROP COLUMN "id",
ADD COLUMN     "company_id" SERIAL NOT NULL,
ADD CONSTRAINT "UserCompany_pkey" PRIMARY KEY ("company_id");
