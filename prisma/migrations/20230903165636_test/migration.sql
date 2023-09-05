-- CreateTable
CREATE TABLE "test1" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tag" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "test1_pkey" PRIMARY KEY ("id")
);
