import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Note: this works
  const allUsers1 = await prisma.user.findMany({
    include: { posts: true },
    orderBy: [
      {
        email: 'desc',
      },
    ],
  })
  console.dir(allUsers1, { depth: null })

  // Note: this throws a TS error
  /*
    Type '{ email: string; }' is not assignable to type 'UserOrderByWithRelationInput'.
      Types of property 'email' are incompatible.
        Type 'string' is not assignable to type 'SortOrder | undefined'.

  */
  const orderBy = [
    {
      email: 'desc',
    },
  ]

  const allUsers2 = await prisma.user.findMany({
    include: { posts: true },
    orderBy,
  })
  console.dir(allUsers2, { depth: null })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
