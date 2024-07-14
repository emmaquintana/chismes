/*
  Warnings:

  - The primary key for the `chismes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chisme_createdAt` on the `chismes` table. All the data in the column will be lost.
  - You are about to drop the column `chisme_desc` on the `chismes` table. All the data in the column will be lost.
  - You are about to drop the column `chisme_id` on the `chismes` table. All the data in the column will be lost.
  - You are about to drop the column `chisme_isActive` on the `chismes` table. All the data in the column will be lost.
  - You are about to drop the column `chisme_title` on the `chismes` table. All the data in the column will be lost.
  - You are about to drop the column `chisme_updatedAt` on the `chismes` table. All the data in the column will be lost.
  - You are about to drop the column `user_bio` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_birthdate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_followers` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_follows` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_gender` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_lastName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_profilePhoto` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_username` on the `users` table. All the data in the column will be lost.
  - Added the required column `desc` to the `Chismes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Chismes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Chismes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthdate` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chismes` DROP PRIMARY KEY,
    DROP COLUMN `chisme_createdAt`,
    DROP COLUMN `chisme_desc`,
    DROP COLUMN `chisme_id`,
    DROP COLUMN `chisme_isActive`,
    DROP COLUMN `chisme_title`,
    DROP COLUMN `chisme_updatedAt`,
    ADD COLUMN `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `desc` VARCHAR(2048) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL,
    ADD COLUMN `isActive` TINYINT NULL,
    ADD COLUMN `title` VARCHAR(250) NOT NULL,
    ADD COLUMN `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT '0000-00-00 00:00:00',
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP COLUMN `user_bio`,
    DROP COLUMN `user_birthdate`,
    DROP COLUMN `user_createdAt`,
    DROP COLUMN `user_email`,
    DROP COLUMN `user_firstName`,
    DROP COLUMN `user_followers`,
    DROP COLUMN `user_follows`,
    DROP COLUMN `user_gender`,
    DROP COLUMN `user_lastName`,
    DROP COLUMN `user_password`,
    DROP COLUMN `user_profilePhoto`,
    DROP COLUMN `user_status`,
    DROP COLUMN `user_updatedAt`,
    DROP COLUMN `user_username`,
    ADD COLUMN `bio` VARCHAR(2048) NULL,
    ADD COLUMN `birthdate` DATE NOT NULL,
    ADD COLUMN `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `email` TEXT NOT NULL,
    ADD COLUMN `firstName` VARCHAR(40) NULL,
    ADD COLUMN `followers` MEDIUMINT UNSIGNED NULL,
    ADD COLUMN `follows` MEDIUMINT UNSIGNED NULL,
    ADD COLUMN `gender` ENUM('M', 'F', 'O') NULL,
    ADD COLUMN `lastName` VARCHAR(40) NULL,
    ADD COLUMN `password` VARCHAR(40) NOT NULL,
    ADD COLUMN `profilePhoto` BLOB NULL,
    ADD COLUMN `status` ENUM('1', '2', '3') NULL,
    ADD COLUMN `updatedAt` TIMESTAMP(0) NULL,
    ADD COLUMN `username` VARCHAR(40) NULL;
