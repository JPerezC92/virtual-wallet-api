-- AlterTable
ALTER TABLE `Account` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Movement` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `User` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- CreateIndex
CREATE INDEX `Account_updatedAt_idx` ON `Account`(`updatedAt`);

-- CreateIndex
CREATE INDEX `Movement_updatedAt_idx` ON `Movement`(`updatedAt`);

-- CreateIndex
CREATE INDEX `User_updatedAt_idx` ON `User`(`updatedAt`);
