import React from "react";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssuesTable from "./_component/IssuesTable";
import IssueStatusFilter from "./_component/IssueStatusFilter";
import { Issue, Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import prisma from "@/prisma/client";
import SortColumns from "./_component/SortColumns";

const pageSize = 10;

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const IssuePage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = SortColumns.map((col) => col.value).includes(
    searchParams.orderBy
  )
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
    <div>
      <Flex mb="5" justify="between">
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
    </div>
  );
};

export default IssuePage;
