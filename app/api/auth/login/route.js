import prisma from "@/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
    if(req.method !== "POST") { 
        return NextResponse.json(
            { error: "Method not allowed" },
            { status: 405 }
        );
    }
    const body = await req.json();
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            },
            include: {
                role: true
            }
        });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
        const isPasswordValid = await bcrypt.compare(body.password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign(
                { firstName: user.firstName, lastName: user.lastName, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "30d" }
            )
            return NextResponse.json(
                { token },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 401 }
            );
        }
    } catch (error) {
        NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
