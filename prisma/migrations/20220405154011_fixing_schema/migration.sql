/*
  Warnings:

  - You are about to drop the column `telegraphURL` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `telegraphToken` on the `User` table. All the data in the column will be lost.
  - Added the required column `text` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "telegraphURL",
ADD COLUMN     "text" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "telegraphToken";
