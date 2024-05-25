/*
  Warnings:

  - You are about to drop the column `idPartido` on the `Votante` table. All the data in the column will be lost.
  - Added the required column `partido` to the `Votante` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Votante" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "partido" INTEGER NOT NULL
);
INSERT INTO "new_Votante" ("id") SELECT "id" FROM "Votante";
DROP TABLE "Votante";
ALTER TABLE "new_Votante" RENAME TO "Votante";
PRAGMA foreign_key_check("Votante");
PRAGMA foreign_keys=ON;
