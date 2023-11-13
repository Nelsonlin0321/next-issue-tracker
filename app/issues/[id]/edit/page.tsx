import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../../_component/IssueFormSkeleton";
const IssueForm = dynamic(() => import("@/app/issues/_component/issueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton formType="Edit" />,
});

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
