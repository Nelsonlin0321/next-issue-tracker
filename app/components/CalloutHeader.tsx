import React, { ReactNode } from "react";
import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface Props {
  color: "red" | "green";
  children: ReactNode;
}

const CalloutHeader = ({ children, color }: Props) => {
  return (
    <div className="mb-3">
      <Callout.Root color={color}>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>{children}</Callout.Text>
      </Callout.Root>
    </div>
  );
};

export default CalloutHeader;
