/*
  Warnings:

  - You are about to drop the column `description` on the `Movement` table. All the data in the column will be lost.
  - Added the required column `concept` to the `Movement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Movement` DROP COLUMN `description`,
    ADD COLUMN `concept` VARCHAR(191) NOT NULL;
