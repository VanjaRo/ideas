/*
  Warnings:

  - You are about to drop the column `profilePhotoURL` on the `User` table. All the data in the column will be lost.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePhotoURL",
ADD COLUMN     "username" TEXT NOT NULL;
