"use client";
import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  searchParams: { error: string };
}

const SignoutPage = ({ searchParams }: Props) => {
  const error = searchParams.error;
  const router = useRouter();
  return (
    <>
      <Card
        className="p-5 absolute m-auto left-0 right-0"
        style={{ maxWidth: 320 }}
      >
        <Box>
          <Flex align="center" gap="5" direction="column">
            <Heading color="red">{error}</Heading>
            <Text>You do not have permission to sign in.</Text>
            <Button
              className="w-full"
              radius="full"
              size="4"
              onClick={() => {
                router.push("/auth/signin");
              }}
            >
              Sign in
            </Button>
          </Flex>
        </Box>
      </Card>
    </>
  );
};

export default SignoutPage;
