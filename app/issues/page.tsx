import React from "react";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssuesTable from "./_component/IssuesTable";
import IssueStatusFilter from "./_component/IssueStatusFilter";
import { Issue, Status } from "@prisma/client";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}

const IssuePage = ({ searchParams }: Props) => {
  return (
    <div>
      <Flex mb="5" justify="between">
        <IssueStatusFilter />
        <Button>
          <Link href="issues/new">New Issue</Link>
        </Button>
      </Flex>
      <IssuesTable searchParams={searchParams} />
    </div>
  );
};

export default IssuePage;
