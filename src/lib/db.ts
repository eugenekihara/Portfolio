import { PrismaClient } from '@prisma/client'
import path from 'path'
import { existsSync } from 'fs'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function resolveDatabaseUrl(): string {
  let dbUrl = process.env.DATABASE_URL

  if (dbUrl) {
    // If it's a relative path (file:./...), resolve it relative to cwd
    if (dbUrl.startsWith('file:./')) {
      const relativePath = dbUrl.replace('file:', '')
      const absolutePath = path.resolve(process.cwd(), relativePath)
      return `file:${absolutePath}`
    }
    return dbUrl
  }

  // Fallback: compute path relative to current working directory
  const dbPath = path.join(process.cwd(), 'db', 'custom.db')
  return `file:${dbPath}`
}

function createPrismaClient() {
  const dbUrl = resolveDatabaseUrl()
  process.env.DATABASE_URL = dbUrl

  // Check if the database file exists
  const dbFilePath = dbUrl.replace('file:', '')
  if (!existsSync(dbFilePath)) {
    console.warn(`[DB] Database file not found at: ${dbFilePath}`)
    console.warn(`[DB] Run 'npx prisma db push' to create the database.`)
  }

  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

  // Test connection on first creation
  client.$connect()
    .then(() => {
      console.log('[DB] Prisma connected successfully')
      console.log('[DB] Database:', dbUrl.substring(0, 80))
    })
    .catch((err) => {
      console.error('[DB] Prisma connection failed:', err.message)
      console.error('[DB] DATABASE_URL:', dbUrl)
      console.error('[DB] CWD:', process.cwd())
    })

  return client
}

export const db =
  globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
