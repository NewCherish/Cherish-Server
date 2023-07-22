/*
  Warnings:

  - You are about to drop the column `plantLevelId` on the `UserPlant` table. All the data in the column will be lost.
  - Added the required column `plantId` to the `UserPlant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserPlant` DROP FOREIGN KEY `UserPlant_plantLevelId_fkey`;

-- AlterTable
ALTER TABLE `UserPlant` DROP COLUMN `plantLevelId`,
    ADD COLUMN `plantId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `UserPlant` ADD CONSTRAINT `UserPlant_plantId_fkey` FOREIGN KEY (`plantId`) REFERENCES `Plant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
