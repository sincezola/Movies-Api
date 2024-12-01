/*
  Warnings:

  - You are about to alter the column `duration` on the `movies` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "category" TEXT NOT NULL
);
INSERT INTO "new_movies" ("category", "duration", "id", "name") SELECT "category", "duration", "id", "name" FROM "movies";
DROP TABLE "movies";
ALTER TABLE "new_movies" RENAME TO "movies";
CREATE UNIQUE INDEX "movies_name_key" ON "movies"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
