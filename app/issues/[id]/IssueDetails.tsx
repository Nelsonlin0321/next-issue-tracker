import { IssueStatusBadge } from "@/app/components";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import { Issue } from "@prisma/client";
import Markdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="2" className="my-5">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
};

export default IssueDetails;
