/*
  Warnings:

  - You are about to drop the column `isVerified` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `verificationToken` on the `accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "isVerified",
DROP COLUMN "verificationToken";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verificationToken" TEXT;
