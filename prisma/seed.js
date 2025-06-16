const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient

async function main() {
    const totalMachines = 7

    for (i = 0; i <= totalMachines; i++) {
        const data = {
            name: `Machine ${i}`
        }

        console.log(i)

        await prisma.washingMachine.create({data})
    }

}


main()