/*
  Warnings:

  - You are about to drop the `member_mission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `member_mission` DROP FOREIGN KEY `member_mission_member_id_fkey`;

-- DropForeignKey
ALTER TABLE `member_mission` DROP FOREIGN KEY `member_mission_mission_id_fkey`;

-- DropForeignKey
ALTER TABLE `member_mission` DROP FOREIGN KEY `member_mission_store_id_fkey`;

-- DropTable
DROP TABLE `member_mission`;

-- CreateTable
CREATE TABLE `MemberMission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberId` INTEGER NOT NULL,
    `missionId` INTEGER NOT NULL,
    `storeId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MemberMission` ADD CONSTRAINT `MemberMission_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberMission` ADD CONSTRAINT `MemberMission_missionId_fkey` FOREIGN KEY (`missionId`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberMission` ADD CONSTRAINT `MemberMission_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
