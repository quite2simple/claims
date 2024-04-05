-- AlterTable
ALTER TABLE "Claim" ALTER COLUMN "verifiedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Source" ALTER COLUMN "verifiedAt" DROP NOT NULL;
