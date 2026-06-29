// Update the Trendz project thumbnail in the database
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const updated = await prisma.project.update({
    where: { slug: 'trendz' },
    data: { thumbnail: '/trendz/trendz-thumbnail.png' },
  })
  console.log('Updated thumbnail for:', updated.title)
  console.log('New thumbnail path:', updated.thumbnail)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
