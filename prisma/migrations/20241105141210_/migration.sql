/*
  Warnings:

  - You are about to drop the column `point` on the `member` table. All the data in the column will be lost.
  - You are about to drop the column `social_type` on the `member` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `member` DROP COLUMN `point`,
    DROP COLUMN `social_type`,
    DROP COLUMN `status`;
