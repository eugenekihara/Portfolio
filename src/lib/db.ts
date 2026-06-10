import { PrismaClient } from '@prisma/client'
import path from 'path'
import { existsSync, mkdirSync } from 'fs'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function resolveDatabaseUrl(): string {
  let dbUrl = process.env.DATABASE_URL

  if (!dbUrl) {
    // Fallback: use prisma/db/custom.db relative to current working directory
    const dbPath = path.join(process.cwd(), 'prisma', 'db', 'custom.db')
    dbUrl = `file:${dbPath}`
  } else if (dbUrl.startsWith('file:./')) {
    // Resolve relative paths the same way Prisma CLI does:
    // Prisma CLI resolves "file:./db/custom.db" relative to the prisma/ directory,
    // not relative to cwd. We must match that behavior so the runtime
    // connects to the same database file that prisma db push created.
    const relativePath = dbUrl.replace('file:', '')
    const prismaDir = path.join(process.cwd(), 'prisma')
    const absolutePath = path.resolve(prismaDir, relativePath)
    dbUrl = `file:${absolutePath}`
  }

  return dbUrl
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
