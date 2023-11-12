import { Status } from "@prisma/client";

type colorType = "red" | "violet" | "green";

const statusMap: Record<
  Status,
  { label: String; color: colorType}
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

export default statusMap;