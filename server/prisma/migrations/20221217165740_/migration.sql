-- DropIndex
DROP INDEX `Auth_token_key` ON `Auth`;

-- AlterTable
ALTER TABLE `Auth` MODIFY `token` TEXT NOT NULL;
