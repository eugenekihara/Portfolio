import { PrismaClient } from '@prisma/client'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // Ensure DATABASE_URL points to a valid SQLite file
  // If DATABASE_URL is not set or points to a non-existent file, try to fix it
  let dbUrl = process.env.DATABASE_URL

  if (!dbUrl) {
    // Fallback: compute path relative to project root
    const dbPath = path.join(process.cwd(), 'db', 'custom.db')
    dbUrl = `file:${dbPath}`
    console.warn(`[DB] DATABASE_URL not set, using: ${dbUrl}`)
    process.env.DATABASE_URL = dbUrl
  }

  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

  // Test connection on first creation
  client.$connect()
    .then(() => {
      console.log('[DB] Prisma connected successfully')
    })
    .catch((err) => {
      console.error('[DB] Prisma connection failed:', err.message)
      console.error('[DB] DATABASE_URL:', dbUrl?.substring(0, 80))
    })

  return client
}

export const db =
  globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
