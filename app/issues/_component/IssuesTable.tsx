import React from "react";
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { IssueStatusBadge, Link } from "../../components";
import { Status } from "@prisma/client";
import { Issue } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}

const statuses = Object.values(Status);

const IssuesTable = async ({ searchParams }: Props) => {
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created",
      value: "createAt",
      className: "hidden md:table-cell",
    },
  ];

  const orderBy = columns.map((col) => col.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy: orderBy,
  });

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((col) => (
            <Table.ColumnHeaderCell className={col.className} key={col.value}>
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: col.value },
                }}
              >
                {col.label}
              </NextLink>
              {col.value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.RowHeaderCell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.RowHeaderCell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssuesTable;
