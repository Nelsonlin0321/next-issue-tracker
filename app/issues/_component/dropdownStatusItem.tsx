import { DropdownMenu } from "@radix-ui/themes";
import statusMap from "@/app/components/statusMap";
import { Status } from "@prisma/client";

interface Props {
  status: Status;
  changeStatusQuery: (status: Status) => void;
}

const DropdownStatusItem = ({ status, changeStatusQuery }: Props) => {
  return (
    <DropdownMenu.Item onClick={() => changeStatusQuery(status)}>
      {statusMap[status].label}
    </DropdownMenu.Item>
  );
};

export default DropdownStatusItem;
