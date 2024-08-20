/*
  Warnings:

  - You are about to drop the column `rating_avg` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `rating_count` on the `Rating` table. All the data in the column will be lost.
  - Added the required column `rating` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviews` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "rating_avg",
DROP COLUMN "rating_count",
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "reviews" INTEGER NOT NULL;
