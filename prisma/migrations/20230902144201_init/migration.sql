-- CreateTable
CREATE TABLE "usertest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,

    CONSTRAINT "usertest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usertest_id_key" ON "usertest"("id");
