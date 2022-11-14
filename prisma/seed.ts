import {faker} from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const data = Array.from({ length: 100000 }).map((_, i) => ({
    name: faker.name.firstName(),
    email: faker.internet.email(),
  }))
  await prisma.user.createMany(
    {
      data,
    }
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})  