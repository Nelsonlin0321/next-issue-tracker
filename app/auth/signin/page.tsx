"use client";
import { Box, Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import googleIcon from "@/public/google.svg";
import { signIn } from "next-auth/react";

const SigninPage = () => {
  return (
    <>
      <Card className=" p-5 mx-auto" style={{ maxWidth: 400 }}>
        <Flex direction="column" gap="5">
          <Box id="google">
            <Button
              className="w-full"
              radius="full"
              variant="soft"
              color="gray"
              size="4"
              onClick={() => signIn("google", { callbackUrl: "/" })}
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
          <Flex className="text-center" align="center" gap="3">
            <hr className="w-1/2" />
            <Text className="whitespace-nowrap">Sign in with your email</Text>
            <hr className="w-1/2" />
          </Flex>
          <Box id="credentials">
            <Flex direction="column" gap="4">
              <Flex direction="column" gap="2">
                <label className="font-semibold">Email:</label>
                <TextField.Input
                  radius="large"
                  placeholder="Enter your email"
                />
              </Flex>
              <Flex direction="column" gap="2">
                <label className="font-semibold">Password:</label>
                <TextField.Input
                  radius="large"
                  placeholder="Enter your password"
                  type="password"
                />
              </Flex>
              <Flex gap="2" justify="end">
                <Button variant="soft">
                  <Text className=" font-bold">Create your account</Text>
                </Button>
                <Button>
                  <Text className=" font-bold"> Sign In</Text>
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Card>
    </>
  );
};

export default SigninPage;
