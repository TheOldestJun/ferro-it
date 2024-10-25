import prisma from "@/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";


export async function POST(req) {
    const body = await req.json();
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: await bcrypt.hash(body.password, 10),
                firstName: body.firstName,
                lastName: body.lastName,
                roleId: body.roleId
            }
        })
        if (user) {
            return NextResponse.json(
                { message: "User created successfully" },
                { status: 200 }
            );
        }
    } catch (error) {
        NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}