import { pathIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "@/app/auth/authOptions";
interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  if (!["ADMIN", "EDITOR"].includes(session.user.role)) {
    return NextResponse.json(
      {
        message: "You do not have the permission to edit this issue.",
      },
      { status: 401 }
    );
  }

  const body = await request.json();
  const validation = pathIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { title, description, status, assignedToUserId } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
    }
  }

  const issueId = parseInt(params.id);

  const issue = await prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  });
  if (!issue) {
    return NextResponse.json(
      { error: `The issue with id ${params.id} doesn't exist!` },
      { status: 404 }
    );
  }

  const updateIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title,
      description,
      status,
      assignedToUserId,
    },
  });

  return NextResponse.json(updateIssue, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  if (["ADMIN", "EDITOR"].includes(session.user.role)) {
    return NextResponse.json(
      {
        message: "You do not have the permission to delete this issue",
      },
      { status: 401 }
    );
  }

  const issueId = parseInt(params.id);

  const issue = await prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  });
  if (!issue) {
    return NextResponse.json(
      { error: `The issue with id ${params.id} doesn't exist!` },
      { status: 404 }
    );
  }

  const deletedIssue = await prisma.issue.delete({ where: { id: issueId } });

  return NextResponse.json(deletedIssue, { status: 200 });
}
