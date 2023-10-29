import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
import prisma from "@/prisma/client";

const schema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description is required",
  }).min(1,"Description is required"),
})

export async function POST(request: NextRequest) {
    const body = await request.json()
    console.log(body)
    const validation = schema.safeParse(body);

  if (!validation.success) {
        console.log(validation.error.errors);
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