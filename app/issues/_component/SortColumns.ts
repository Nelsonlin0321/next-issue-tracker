import { Issue } from "@prisma/client";

const SortColumns: { label: string; value: keyof Issue; className?: string }[] =
  [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created",
      value: "createAt",
      className: "hidden md:table-cell",
    },
  ];

export default SortColumns;
