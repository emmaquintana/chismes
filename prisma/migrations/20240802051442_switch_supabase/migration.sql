-- CreateEnum
CREATE TYPE "users_status" AS ENUM ('A', 'S', 'B');

-- CreateEnum
CREATE TYPE "users_gender" AS ENUM ('M', 'F', 'O', 'NR');

-- CreateTable
CREATE TABLE "chismes" (
    "user_id" VARCHAR(48) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "desc" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN,
    "title" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "chismes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "bio" TEXT,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "followers" INTEGER,
    "follows" INTEGER,
    "gender" "users_gender",
    "lastName" TEXT,
    "password_hash" TEXT,
    "profilePhoto" BYTEA,
    "status" "users_status" NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "username" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset" (
    "user_email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE INDEX "chismes_user_id_idx" ON "chismes"("user_id");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_user_email_key" ON "password_reset"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_token_key" ON "password_reset"("token");

-- AddForeignKey
ALTER TABLE "chismes" ADD CONSTRAINT "chismes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
