const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient

const totalBookings = 3


const moment = require('moment')


async function main() {

    const totalMachines = await prisma.washingMachine.count() || 7
    const totalUsers = await prisma.user.count()

    for(i = 0; i<=totalBookings;i++) {

        const randomMachine = await prisma.washingMachine.findFirst({
            skip: Math.floor(Math.random() * totalMachines)
        })

        const randomUser = await prisma.user.findFirst({
            skip: Math.floor(Math.random() * totalUsers)
        })

        console.log(`random machine id: ${randomMachine.id}`)
        console.log(`random user id: ${randomUser.id}`)

        const data = {
            bookingDate: moment().add(Math.floor(Math.random() * 3), 'days'),
            washingMachine: {
                connect: {
                    id: randomMachine.id
                }
            },
            user: {
                connect: {
                    id: randomUser.id
                }
            },
            isActive: false
        }

        await prisma.booking.create({data})
    }
}

main()