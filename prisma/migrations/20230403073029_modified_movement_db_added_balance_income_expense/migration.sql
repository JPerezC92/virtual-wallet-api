/*
  Warnings:

  - You are about to drop the column `money` on the `Account` table. All the data in the column will be lost.
  - Added the required column `expense` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `income` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Account` DROP COLUMN `money`,
    ADD COLUMN `balance` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `expense` INTEGER NOT NULL,
    ADD COLUMN `income` INTEGER NOT NULL;
