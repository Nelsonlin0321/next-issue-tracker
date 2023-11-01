import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import IssuesTable from "./IssuesTable";

const IssuePage = () => {
  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="issues/new">New Issue</Link>
        </Button>
      </div>
      <IssuesTable />
    </div>
  );
};

export default IssuePage;
