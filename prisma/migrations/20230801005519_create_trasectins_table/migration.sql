/*
  Warnings:

  - Changed the type of `type` on the `categories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "transection_type" AS ENUM ('INCOME', 'EXPENSE');

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "type",
ADD COLUMN     "type" "transection_type" NOT NULL;

-- DropEnum
DROP TYPE "transection-type";

-- CreateTable
CREATE TABLE "transections_type" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "bank_account_id" UUID NOT NULL,
    "category_id" UUID,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "transection_type" NOT NULL,

    CONSTRAINT "transections_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transections_type" ADD CONSTRAINT "transections_type_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transections_type" ADD CONSTRAINT "transections_type_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "bank_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transections_type" ADD CONSTRAINT "transections_type_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
