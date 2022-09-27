-- CreateTable
CREATE TABLE "Shorts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "origin" TEXT NOT NULL,
    "short" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Shorts_short_key" ON "Shorts"("short");
