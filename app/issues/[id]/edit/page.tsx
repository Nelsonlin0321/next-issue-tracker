import { notFound } from "next/navigation";
import IssueForm from "../../_component/issueForm";
import prisma from "@/prisma/client";

interface Props {
  params: {
    id: string;
  };
}

const EditIssuePage = async ({ params }: Props) => {
  const id = parseInt(params.id);

  if (isNaN(id)) return notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: id },
  });

  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
