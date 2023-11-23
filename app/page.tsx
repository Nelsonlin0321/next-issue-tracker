import prisma from "@/prisma/client";
import LatestIssue from "./LatestIssue";
import IssueSummary from "./issueSummary";
import { isAsync } from "zod";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { page: string };
}

const Home = async ({ searchParams }: Props) => {
  // return <LatestIssue />;
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

  return (
    <IssueSummary
      open={getStatusCount("OPEN")}
      inProgress={getStatusCount("IN_PROGRESS")}
      closed={getStatusCount("CLOSED")}
    />
  );
};

export default Home;
