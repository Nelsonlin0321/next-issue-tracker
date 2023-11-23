import prisma from "@/prisma/client";
import {
  Avatar,
  Box,
  Card,
  Flex,
  Heading,
  Table,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IssueStatusBadge } from "./components";

const LatestIssue = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issue
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Card>
                      <Flex gap="3" align="center">
                        <Avatar
                          src={issue.assignedToUser.image!}
                          fallback={issue.assignedToUser.name!}
                          size="2"
                          radius="full"
                        />
                        <Box>
                          <Text as="div" size="2" weight="bold">
                            {issue.assignedToUser.name}
                          </Text>
                          <Text as="div" size="2" color="gray">
                            {issue.assignedToUser.email}
                          </Text>
                        </Box>
                      </Flex>
                    </Card>
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssue;
