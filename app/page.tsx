import prisma from "@/prisma/client";
import LatestIssue from "./LatestIssue";
import IssueSummary from "./issueSummary";
import { Status } from "@prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

const Home = async () => {
  const statusCountList = await prisma.issue.groupBy({
    by: "status",
    _count: {
      id: true,
    },
  });

  const getStatusCount = (status: Status) => {
    const item = statusCountList.find((item) => item.status == status);

    return item ? item._count.id : 0;
  };

  const openCount = getStatusCount("OPEN");
  const inProgressCount = getStatusCount("IN_PROGRESS");
  const closedCount = getStatusCount("CLOSED");

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary
          open={openCount}
          inProgress={inProgressCount}
          closed={closedCount}
        />
        <IssueChart
          open={openCount}
          inProgress={inProgressCount}
          closed={closedCount}
        />
      </Flex>
      <LatestIssue />
    </Grid>
  );
};

export const dynamic = "force-dynamic";

export default Home;

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project status",
};
