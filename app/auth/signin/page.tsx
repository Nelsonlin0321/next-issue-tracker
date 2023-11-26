"use client";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import googleIcon from "@/public/google.svg";
import { signIn } from "next-auth/react";
import CredentialSignIn from "../_components/CredentialSignIn";
import toast, { Toaster } from "react-hot-toast";
interface Props {
  searchParams: { error: string };
}

const SigninPage = ({ searchParams }: Props) => {
  return (
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
        <CredentialSignIn />
      </Flex>
      <Toaster />
    </Card>
  );
};

export default SigninPage;
