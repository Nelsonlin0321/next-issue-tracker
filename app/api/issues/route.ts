import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
import prisma from "@/prisma/client";

const schema = z.object({
    title: z.string().min(5),
    description: z.string().min(5)
})

export async function POST(request: NextRequest) {
    const body = await request.json()

    const validation = schema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }


  const issue = await prisma.issue.create({

    data: {

      title: body.title,

      description: body.description,

    },

  })
    
    return NextResponse.json(issue, { status: 200 })
    

}