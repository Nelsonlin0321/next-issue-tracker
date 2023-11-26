"use client";
import { Button, Card, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import z from "zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { CalloutHeader, Spinner } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";
import delay from "delay";

const passwordSchema = z
  .string()
  .min(1, "password is required")
  .min(6, "password must have than 6 characters");

const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: passwordSchema,
    confirmedPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmedPassword, {
    path: ["confirmedPassword"],
    message: "Password do not match",
  });

const RegisterPage = () => {
  const router = useRouter();
  type FormData = z.infer<typeof FormSchema>;

  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmedPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      setSubmitting(true);
      await axios.post("/api/register", data);
      toast.success("Account created successfully !");
      await delay(500);
      router.push("/auth/signin");
    } catch (error) {
      const response = (error as AxiosError).response;
      const message = (response?.data as { message: string }).message;
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <Card className=" p-5 mx-auto" style={{ maxWidth: 400 }}>
          <Flex direction="column" gap="5">
            <Flex direction="column" className="text-center" gap="1">
              <Heading>Create your account</Heading>
              <Text color="gray" size={"2"}>
                create your account to view and manage issues
              </Text>
            </Flex>
            <Flex direction="column" gap="2">
              <CalloutHeader color="red">{errors.email?.message}</CalloutHeader>
              <label className="font-semibold">Email:</label>
              <TextField.Input
                {...register("email")}
                radius="large"
                placeholder="Enter your email"
              />
            </Flex>
            <Flex direction="column" gap="2">
              <CalloutHeader color="red">
                {errors.username?.message}
              </CalloutHeader>
              <label className="font-semibold">Username:</label>
              <TextField.Input
                {...register("username")}
                radius="large"
                placeholder="Enter your username"
              />
            </Flex>
            <Flex direction="column" gap="2">
              <CalloutHeader color="red">
                {errors.password?.message}
              </CalloutHeader>
              <label className="font-semibold">Password:</label>
              <TextField.Input
                {...register("password")}
                radius="large"
                placeholder="Enter your password"
                type="password"
              />
            </Flex>

            <Flex direction="column" gap="2">
              <CalloutHeader color="red">
                {errors.confirmedPassword?.message}
              </CalloutHeader>
              <label className="font-semibold">Confirm Password:</label>
              <TextField.Input
                {...register("confirmedPassword")}
                radius="large"
                placeholder="confirm your password"
                type="password"
              />
            </Flex>
            <Button type="submit">
              {isSubmitting ? (
                <Spinner />
              ) : (
                <Text className=" font-bold">Create your account</Text>
              )}
            </Button>
          </Flex>
        </Card>
      </form>
      <Toaster />
    </>
  );
};

export default RegisterPage;
