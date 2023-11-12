import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";
import statusMap from "./statusMap";
const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
