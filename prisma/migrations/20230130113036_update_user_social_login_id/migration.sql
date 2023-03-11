-- AlterTable
ALTER TABLE `User` ADD COLUMN `appleId` VARCHAR(191) NULL,
    ADD COLUMN `appleRefreshToken` VARCHAR(191) NULL,
    ADD COLUMN `kakaoId` BIGINT NULL;
