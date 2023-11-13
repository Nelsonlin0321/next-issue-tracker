import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
// import delay from "delay";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
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
    <Grid
      columns={{
        initial: "1",
        md: "2",
      }}
      gap="5"
    >
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
