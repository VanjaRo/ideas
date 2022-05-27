/*
  Warnings:

  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "_PostToTheme" DROP CONSTRAINT "_PostToTheme_A_fkey";

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_PostToTheme" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "_PostToTheme" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
