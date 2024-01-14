import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.deleteMany()
  await prisma.book.deleteMany()

  console.log('Seeding...')

  const user3 = await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      username: 'WANG',
      role: 'ADMIN',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm' // secret42
    }
  })
  console.log({ user3 })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
