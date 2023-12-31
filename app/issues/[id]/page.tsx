import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
// import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import IssueDetails from "./IssueDetails";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";
interface Props {
  params: { id: string };
}

const cacheIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const id = parseInt(params.id);

  if (isNaN(id)) return notFound();

  // const issue = await prisma.issue.findUnique({
  //   where: { id: id },
  // });

  const issue = await cacheIssue(id);

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <DeleteIssueButton issueId={issue.id} />
            <EditIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await cacheIssue(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Detail: " + issue?.description,
  };
}

export default IssueDetailPage;
