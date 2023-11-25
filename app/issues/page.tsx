import React from "react";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssuesTable, { IssueQuery } from "./_component/IssuesTable";
import IssueStatusFilter from "./_component/IssueStatusFilter";
import { Issue, Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import prisma from "@/prisma/client";
import { columnNames } from "./_component/IssuesTable";
import { Metadata } from "next";

const pageSize = 10;

interface Props {
  searchParams: IssueQuery;
}

const IssuePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const currentPage = isNaN(parseInt(searchParams.page))
    ? 1
    : parseInt(searchParams.page);

  const where = { status: status };
  const issues = await prisma.issue.findMany({
    where: where,
    orderBy: orderBy,
    take: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

  const itemCount = await prisma.issue.count({ where: where });

  return (
    <Flex direction="column" gap="3">
      <Flex justify="between">
        <IssueStatusFilter />
        <Button>
          <Link href="issues/new">New Issue</Link>
        </Button>
      </Flex>
      <IssuesTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={itemCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuePage;
