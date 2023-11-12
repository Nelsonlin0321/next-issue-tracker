import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  await delay(1000);

  // if (typeof Number(params.id)) return notFound();

  const id = parseInt(params.id);

  if (isNaN(id)) return notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: id },
  });

  if (!issue) return notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="2" className="my-5">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createAt.toDateString()}</Text>
      </Flex>
      <Card className="prose">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
