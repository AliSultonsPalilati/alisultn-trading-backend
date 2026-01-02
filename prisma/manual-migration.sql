-- Manual Migration Script
-- Jalankan ini di Supabase SQL Editor

-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Journal table
CREATE TABLE IF NOT EXISTS "Journal" (
  id SERIAL PRIMARY KEY,
  ticker TEXT NOT NULL,
  type TEXT NOT NULL,
  price DOUBLE PRECISION NOT NULL,
  lots INTEGER NOT NULL,
  "imageUrl" TEXT,
  notes TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "userId" INTEGER NOT NULL,
  CONSTRAINT "Journal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create enum type
DO $$ BEGIN
  CREATE TYPE "StrategyCategory" AS ENUM ('SCALPING', 'SWING', 'IPO');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create Strategy table
CREATE TABLE IF NOT EXISTS "Strategy" (
  id SERIAL PRIMARY KEY,
  category "StrategyCategory" NOT NULL,
  ticker TEXT NOT NULL,
  reason TEXT,
  "targetPrice" DOUBLE PRECISION,
  "stopLoss" DOUBLE PRECISION,
  "ipoPrice" DOUBLE PRECISION,
  "ipoLots" INTEGER,
  "ipoStatus" TEXT,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "userId" INTEGER NOT NULL,
  CONSTRAINT "Strategy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "Journal_userId_idx" ON "Journal"("userId");
CREATE INDEX IF NOT EXISTS "Strategy_userId_idx" ON "Strategy"("userId");
