import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

// const statusMap: { label: string, color: string }[] =
// : Record<Status, { label: String; color: String }>
const statusMap: Record<
  Status,
  { label: String; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
