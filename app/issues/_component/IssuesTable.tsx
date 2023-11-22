import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { IssueStatusBadge, Link } from "../../components";
interface Props {
  issues: Issue[];
  searchParams: { status: Status; orderBy: keyof Issue };
}

const IssuesTable = async ({ issues, searchParams }: Props) => {
  return (
    <Table.Root variant="surface" mb="2">
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

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Created",
    value: "createAt",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((col) => col.value);

export default IssuesTable;
