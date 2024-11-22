/*
  Warnings:

  - Added the required column `test` to the `food_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `food_category` ADD COLUMN `test` INTEGER NOT NULL;
