const { PrismaClient }  = require("@prisma/client") 

const prisma = new PrismaClient

const users = [
    {
        name: "Merve",
        email: "merve@gmail.com"
    },
    {
        name: "Sama",
        email: "sama@gmail.com"
    }
]

async function main() {


    users.forEach(async (user) => {

        console.log(`Creating: ${user.name}`)

        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: '123456'
            }
        })

    })

}

main()

