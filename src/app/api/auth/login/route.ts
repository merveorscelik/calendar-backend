import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient


export async function POST(req: Request) {
    const body = await req.json()

    const {
        email,
        password
    } = body

    const user = await prisma.user.findFirst({
        where: {
            email,
            password
        }
    })

    if(!user) {
        return NextResponse.json({
            message: "Credentials not match."
        }, {status: 401})
    }


    return NextResponse.json({
        data: user,
        message: "Authenticated"
    })
}
