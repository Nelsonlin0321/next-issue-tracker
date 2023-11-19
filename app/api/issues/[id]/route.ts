import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/app/auth/authOptions";
interface Props {
  params: { id: string };
}


export async function PATCH(request: NextRequest, { params }: Props) {

  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({},{status:401})
  }

  const body = await request.json()
  const validation = issueSchema.safeParse(body);
    
  if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }
    
  const issueId = parseInt(params.id)

  const issue = await prisma.issue.findUnique({
        where: {
          id: issueId
        }}
  )
  if (!issue) {
    return NextResponse.json({error: `The issue with id ${params.id} doesn't exist!`}, { status: 404 });
  }

  const updateStatus = body.status ? body.status: issue.status

  
    const updateIssue = await prisma.issue.update({
        where: {
            id: issue.id,
        },
        data: { title: body.title, description: body.description,status: updateStatus }
    })

    return NextResponse.json(updateIssue,{ status: 200 });
 }



export async function DELETE(request: NextRequest, { params }: Props) {

    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({},{status:401})
    }

  const issueId = parseInt(params.id)

    const issue = await prisma.issue.findUnique({
        where: {
          id: issueId
        }}
  )
  if (!issue) {
    return NextResponse.json({error: `The issue with id ${params.id} doesn't exist!`}, { status: 404 });
  }

  const deletedIssue = await prisma.issue.delete({ where: { id: issueId } })
  
  return NextResponse.json(deletedIssue,{status:200})

}