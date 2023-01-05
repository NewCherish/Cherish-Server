/*
  Warnings:

  - You are about to drop the column `isWatered` on the `UserPlant` table. All the data in the column will be lost.
  - You are about to drop the column `noticeTime` on the `UserPlant` table. All the data in the column will be lost.
  - You are about to drop the column `plantId` on the `UserPlant` table. All the data in the column will be lost.
  - You are about to drop the `PlantStatus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `plantLevelId` to the `UserPlant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserPlant` DROP FOREIGN KEY `UserPlant_plantId_fkey`;

-- AlterTable
ALTER TABLE `UserPlant` DROP COLUMN `isWatered`,
    DROP COLUMN `noticeTime`,
    DROP COLUMN `plantId`,
    ADD COLUMN `plantLevelId` INTEGER NOT NULL,
    ADD COLUMN `waterTime` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `PlantStatus`;

-- AddForeignKey
ALTER TABLE `UserPlant` ADD CONSTRAINT `UserPlant_plantLevelId_fkey` FOREIGN KEY (`plantLevelId`) REFERENCES `PlantLevel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
