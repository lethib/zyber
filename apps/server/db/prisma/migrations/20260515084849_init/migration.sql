-- CreateEnum
CREATE TYPE "EvaluationStatus" AS ENUM ('NotStarted', 'InProgress', 'Achieved', 'NotApplicable');

-- CreateEnum
CREATE TYPE "MeasureLevel" AS ENUM ('Standard', 'Enhanced');

-- CreateEnum
CREATE TYPE "MeasureTheme" AS ENUM ('SensibiliserEtFormer', 'ConnaitreLeSystemeDInformation', 'AuthentifierEtControlerLesAcces', 'SecuriserLesPostes', 'SecuriserLeReseau', 'SecuriserLAdministration', 'GererLeNomadisme', 'MaintenirLeSystemeDInformationAJour', 'SuperviserAuditerReagir', 'PourAllerPlusLoin');

-- CreateEnum
CREATE TYPE "EvidenceType" AS ENUM ('File', 'Url');

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measure" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "theme" "MeasureTheme" NOT NULL,
    "level" "MeasureLevel" NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluationItem" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "measureId" TEXT NOT NULL,
    "status" "EvaluationStatus" NOT NULL DEFAULT 'NotStarted',
    "comment" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EvaluationItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evidence" (
    "id" TEXT NOT NULL,
    "evaluationItemId" TEXT NOT NULL,
    "type" "EvidenceType" NOT NULL,
    "url" TEXT,
    "storageKey" TEXT,
    "fileName" TEXT,
    "mimeType" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Evidence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Measure_order_key" ON "Measure"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Assessment_organizationId_key" ON "Assessment"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "EvaluationItem_assessmentId_measureId_key" ON "EvaluationItem"("assessmentId", "measureId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationItem" ADD CONSTRAINT "EvaluationItem_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationItem" ADD CONSTRAINT "EvaluationItem_measureId_fkey" FOREIGN KEY ("measureId") REFERENCES "Measure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_evaluationItemId_fkey" FOREIGN KEY ("evaluationItemId") REFERENCES "EvaluationItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
