-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'moderator', 'user');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isDeactivated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user';
