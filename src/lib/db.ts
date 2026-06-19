import { PrismaClient } from '@prisma/client'
import path from 'path'
import { existsSync, mkdirSync } from 'fs'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function resolveDatabaseUrl(): string {
  // Always resolve to the canonical database path at prisma/db/custom.db.
  // This is the ONLY location the database should exist — the same path used
  // by prisma CLI, setup-db.mjs, and the seed script.
  // System env vars or stale .env files may point to wrong locations,
  // so we compute the absolute path from the project root.
  const dbPath = path.join(process.cwd(), 'prisma', 'db', 'custom.db')
  return `file:${dbPath}`
}

function ensureDbDirectory(dbUrl: string): void {
  // Extract the file path from the URL and ensure the directory exists
  const filePath = dbUrl.replace(/^file:/, '')
  const dir = path.dirname(filePath)

  if (!existsSync(dir)) {
    try {
      mkdirSync(dir, { recursive: true })
      console.log(`[DB] Created database directory: ${dir}`)
    } catch (err) {
      console.error(`[DB] Failed to create database directory: ${dir}`, err)
    }
  }
}

function createPrismaClient() {
  const dbUrl = resolveDatabaseUrl()

  // Ensure the database directory exists before connecting
  ensureDbDirectory(dbUrl)

  // Set the resolved URL so Prisma uses it
  process.env.DATABASE_URL = dbUrl

  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

  // Test connection
  client.$connect()
    .then(() => {
      console.log('[DB] ✅ Prisma connected successfully')
    })
    .catch((err) => {
      console.error('[DB] ❌ Prisma connection failed:', err.message)
      console.error('[DB] DATABASE_URL:', dbUrl)
      console.error('[DB] CWD:', process.cwd())
    })

  return client
}

export const db =
  globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
