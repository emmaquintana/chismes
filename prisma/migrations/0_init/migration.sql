-- CreateTable
CREATE TABLE `chismes` (
    `chisme_id` INTEGER NOT NULL,
    `chisme_title` VARCHAR(250) NOT NULL,
    `chisme_desc` VARCHAR(2048) NOT NULL,
    `chisme_createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `chisme_updatedAt` TIMESTAMP(0) NOT NULL DEFAULT '0000-00-00 00:00:00',
    `chisme_isActive` TINYINT NULL,
    `user_id` VARCHAR(48) NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`chisme_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` VARCHAR(48) NOT NULL,
    `user_username` VARCHAR(40) NULL,
    `user_email` TEXT NOT NULL,
    `user_password` VARCHAR(40) NOT NULL,
    `user_createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `user_updatedAt` TIMESTAMP(0) NULL,
    `user_profilePhoto` BLOB NULL,
    `user_firstName` VARCHAR(40) NULL,
    `user_lastName` VARCHAR(40) NULL,
    `user_birthdate` DATE NOT NULL,
    `user_gender` ENUM('M', 'F', 'O') NULL,
    `user_follows` MEDIUMINT UNSIGNED NULL,
    `user_followers` MEDIUMINT UNSIGNED NULL,
    `user_bio` VARCHAR(2048) NULL,
    `user_status` ENUM('1', '2', '3') NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chismes` ADD CONSTRAINT `chismes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

