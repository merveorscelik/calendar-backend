import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";


const prisma = new PrismaClient

export async function GET() {

    const machines = await prisma.washingMachine.findMany({
        include: {
            bookings: true
        }
    })

    return NextResponse.json({
        data: machines
    })

    
}