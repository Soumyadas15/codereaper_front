import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return new Response("User not authenticated", { status: 401 });
        }

        const body = await request.json();
        const { title, imageSrc } = body;

        if (!title) {
            return new Response("Title is required", { status: 400 });
        }

        if (!imageSrc) {
            return new Response("Image is required", { status: 400 });
        }
        
        const existingListing = await prisma.question.findFirst({
            where: {
                title: title
            }
        });

        if (existingListing) {
            return new Response("Solution already exists", { status: 400 });
        }

        const listing = await prisma.question.create({
            //@ts-ignore
            data: {
                title,
                imageSrc,
                userId: currentUser.id,
            }
        });

        return NextResponse.json(listing);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Unexpected error:", error.message);
            return new Response(error.message, { status: 500 });
        } else {
            console.error("Unexpected error:", error);
            return new Response("Internal Server Error", { status: 500 });
        }
    }
}