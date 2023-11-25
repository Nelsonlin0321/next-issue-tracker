"use client";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import googleIcon from "@/public/google.svg";
import { signIn } from "next-auth/react";

const SigninPage = () => {
  return (
    <>
      <Card
        className="p-5 absolute m-auto left-0 right-0"
        style={{ maxWidth: 500 }}
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        <Box>
          <Button
            className="w-full"
            radius="full"
            variant="soft"
            color="gray"
            size="4"
          >
            <Flex align="center" gap="5">
              <Image
                src={googleIcon}
                alt="Google Icon"
                width="18"
                height="18"
              />
              <Text>Sign in with Google</Text>
            </Flex>
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default SigninPage;
