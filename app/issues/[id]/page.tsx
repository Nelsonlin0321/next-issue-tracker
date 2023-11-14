import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
// import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  // await delay(1000);

  const id = parseInt(params.id);

  if (isNaN(id)) return notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: id },
  });

  if (!issue) return notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <DeleteIssueButton issueId={issue.id} />
          <EditIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
