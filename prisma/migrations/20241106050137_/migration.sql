/*
  Warnings:

  - You are about to drop the column `category_id` on the `member_prefer` table. All the data in the column will be lost.
  - You are about to drop the column `member_id` on the `member_prefer` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `mission` table. All the data in the column will be lost.
  - You are about to drop the column `member_id` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `region_id` on the `store` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `member_prefer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `member_prefer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionId` to the `store` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `member_prefer` DROP FOREIGN KEY `member_prefer_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `member_prefer` DROP FOREIGN KEY `member_prefer_member_id_fkey`;

-- DropForeignKey
ALTER TABLE `mission` DROP FOREIGN KEY `mission_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_member_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `store` DROP FOREIGN KEY `store_region_id_fkey`;

-- AlterTable
ALTER TABLE `member_prefer` DROP COLUMN `category_id`,
    DROP COLUMN `member_id`,
    ADD COLUMN `categoryId` BIGINT NOT NULL,
    ADD COLUMN `memberId` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `mission` DROP COLUMN `store_id`,
    ADD COLUMN `storeId` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `member_id`,
    DROP COLUMN `store_id`,
    ADD COLUMN `memberId` BIGINT NOT NULL,
    ADD COLUMN `storeId` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `store` DROP COLUMN `region_id`,
    ADD COLUMN `regionId` BIGINT NOT NULL;

-- AddForeignKey
ALTER TABLE `member_prefer` ADD CONSTRAINT `member_prefer_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_prefer` ADD CONSTRAINT `member_prefer_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `food_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `store_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
