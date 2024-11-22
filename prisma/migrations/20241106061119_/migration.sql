/*
  Warnings:

  - You are about to alter the column `A` on the `_foodcategorytostore` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `B` on the `_foodcategorytostore` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `food_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `food_category` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `member` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `member_mission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `member_mission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `member_id` on the `member_mission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `mission_id` on the `member_mission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `store_id` on the `member_mission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `member_prefer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `member_prefer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `categoryId` on the `member_prefer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `memberId` on the `member_prefer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `mission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `mission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `storeId` on the `mission` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `region` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `region` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `review` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `memberId` on the `review` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `storeId` on the `review` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `store` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `store` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `regionId` on the `store` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `_foodcategorytostore` DROP FOREIGN KEY `_FoodCategoryToStore_A_fkey`;

-- DropForeignKey
ALTER TABLE `_foodcategorytostore` DROP FOREIGN KEY `_FoodCategoryToStore_B_fkey`;

-- DropForeignKey
ALTER TABLE `member_mission` DROP FOREIGN KEY `member_mission_member_id_fkey`;

-- DropForeignKey
ALTER TABLE `member_mission` DROP FOREIGN KEY `member_mission_mission_id_fkey`;

-- DropForeignKey
ALTER TABLE `member_mission` DROP FOREIGN KEY `member_mission_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `member_prefer` DROP FOREIGN KEY `member_prefer_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `member_prefer` DROP FOREIGN KEY `member_prefer_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `mission` DROP FOREIGN KEY `mission_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `store` DROP FOREIGN KEY `store_regionId_fkey`;

-- AlterTable
ALTER TABLE `_foodcategorytostore` MODIFY `A` INTEGER NOT NULL,
    MODIFY `B` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `food_category` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `member` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `member_mission` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `member_id` INTEGER NOT NULL,
    MODIFY `mission_id` INTEGER NOT NULL,
    MODIFY `store_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `member_prefer` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `categoryId` INTEGER NOT NULL,
    MODIFY `memberId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `mission` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `storeId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `region` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `review` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `memberId` INTEGER NOT NULL,
    MODIFY `storeId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `store` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `regionId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `member_mission` ADD CONSTRAINT `member_mission_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_mission` ADD CONSTRAINT `member_mission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_mission` ADD CONSTRAINT `member_mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `_FoodCategoryToStore` ADD CONSTRAINT `_FoodCategoryToStore_A_fkey` FOREIGN KEY (`A`) REFERENCES `food_category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FoodCategoryToStore` ADD CONSTRAINT `_FoodCategoryToStore_B_fkey` FOREIGN KEY (`B`) REFERENCES `store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
