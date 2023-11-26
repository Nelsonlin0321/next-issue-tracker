"use client";
import { CalloutHeader, Spinner } from "@/app/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, TextField, Button, Text } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import toast, { Toaster } from "react-hot-toast";

const passwordSchema = z
  .string()
  .min(1, "password is required")
  .min(6, "password must have than 6 characters");

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: passwordSchema,
});

const CredentialSignIn = () => {
  const router = useRouter();
  type FormData = z.infer<typeof FormSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values: FormData) => {
    setSubmitting(true);
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (signInData?.error) {
      toast.error("Email or password are not correct");
      setSubmitting(false);
    } else {
      router.push("/");
    }
  });

  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <form onSubmit={onSubmit}>
      <Box id="credentials">
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <label className="font-semibold">Email:</label>
            <CalloutHeader color="red">{errors.email?.message}</CalloutHeader>
            <TextField.Input
              {...register("email")}
              radius="large"
              placeholder="example@example.com"
            />
          </Flex>
          <Flex direction="column" gap="2">
            <label className="font-semibold">Password:</label>
            <CalloutHeader color="red">
              {errors.password?.message}
            </CalloutHeader>
            <TextField.Input
              {...register("password")}
              radius="large"
              placeholder="123456"
              type="password"
            />
          </Flex>
          <Flex gap="2" justify="end">
            <Link href="/auth/register">
              <Button variant="soft">
                <Text className="font-bold">Create your account</Text>
              </Button>
            </Link>
            <Button>
              {isSubmitting ? (
                <Spinner />
              ) : (
                <Text typeof="submit" className="font-bold">
                  Sign In
                </Text>
              )}
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Toaster />
    </form>
  );
};

export default CredentialSignIn;
