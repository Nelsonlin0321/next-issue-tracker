import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { number } from "zod";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  // if (typeof Number(params.id)) return notFound();

  const id = parseInt(params.id);

  if (isNaN(id)) return notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: id },
  });

  if (!issue) return notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
