-- CreateTable
CREATE TABLE `User` (
    `token` VARCHAR(191) NOT NULL,
    `id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    PRIMARY KEY (`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
