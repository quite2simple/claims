import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding`);
    await prisma.user.create({
        data: {
            username: 'seed1',
            hashedPassword: 'seed1',
            claims: {
                create: {
                    title: "Birds aren't real!",
                    description: "That's just true"
                }
            }
    }});
    await prisma.user.create({
        data: {
            username: 'seed2',
            hashedPassword: 'seed2',
            claims: {
                create: {
                    title: "Birds are real!",
                    description: "No cap"
                }
            },
    }});
    console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })