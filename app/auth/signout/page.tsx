"use client";
import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { signOut } from "next-auth/react";

const SignoutPage = () => {
  return (
    <>
      <Card
        className="p-5 absolute m-auto left-0 right-0"
        style={{ maxWidth: 320 }}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <Box>
          <Flex align="center" gap="5" direction="column">
            <Heading>Signout</Heading>
            <Text>Are you sure to sign out ?</Text>
            <Button className="w-full" radius="full" size="4">
              Sign out
            </Button>
          </Flex>
        </Box>
      </Card>
    </>
  );
};

export default SignoutPage;
