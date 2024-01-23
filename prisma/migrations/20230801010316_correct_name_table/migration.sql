/*
  Warnings:

  - You are about to drop the `transections_type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "transections_type" DROP CONSTRAINT "transections_type_bank_account_id_fkey";

-- DropForeignKey
ALTER TABLE "transections_type" DROP CONSTRAINT "transections_type_category_id_fkey";

-- DropForeignKey
ALTER TABLE "transections_type" DROP CONSTRAINT "transections_type_user_id_fkey";

-- DropTable
DROP TABLE "transections_type";

-- CreateTable
CREATE TABLE "transections" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "bank_account_id" UUID NOT NULL,
    "category_id" UUID,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "transection_type" NOT NULL,

    CONSTRAINT "transections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transections" ADD CONSTRAINT "transections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transections" ADD CONSTRAINT "transections_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "bank_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transections" ADD CONSTRAINT "transections_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
