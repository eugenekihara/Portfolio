import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Singleton Prisma Client.
 *
 * The connection comes from the environment:
 *  - DATABASE_URL — PostgreSQL connection string used at runtime
 *    (on Neon/Vercel use the pooled URL, e.g. …-pooler…?sslmode=require&pgbouncer=true)
 *  - DIRECT_URL — unpooled URL used by the Prisma CLI for migrations
 *
 * The old SQLite-specific path resolution was removed: the database no longer
 * lives on the local filesystem and nothing may override DATABASE_URL here.
 */
function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      '[DB] DATABASE_URL is not set. Add it to .env (local) or your hosting environment variables.'
    )
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

export const db =
  globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
