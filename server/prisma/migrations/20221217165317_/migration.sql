/*
  Warnings:

  - The primary key for the `Auth` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Auth` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`uid`);