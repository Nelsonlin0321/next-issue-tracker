"use client";
import z from "zod";
// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalloutHeader, Spinner } from "@/app/components";
import { createIssueSchema } from "@/app/validationSchemas";
import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";
const SimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type IssueFormData = z.infer<typeof createIssueSchema>;

// issue props is optional
interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [successfulMessage, setSuccessfulMessage] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await delay(100); // mimic spinner
      await axios.post("/api/issues", data);
      setSuccessfulMessage("Issue has been successfully created!");
      reset();
      setErrorMessage("");
    } catch (error) {
      setSuccessfulMessage("");
      setErrorMessage((error as AxiosError).message);
    } finally {
      setSubmitting(false);
    }
  });
  // const router = useRouter();

  return (
    <div className="max-w-2xl">
      {<CalloutHeader color="green">{successfulMessage}</CalloutHeader>}
      <form onSubmit={onSubmit}>
        <div className="space-y-3">
          {<CalloutHeader color="red">{errorMessage}</CalloutHeader>}
          <TextField.Root>
            <TextField.Input
              placeholder="Issue Title"
              {...register("title")}
              defaultValue={issue?.title}
            />
          </TextField.Root>
          {<CalloutHeader color="red">{errors.title?.message}</CalloutHeader>}
          <Controller
            control={control}
            name="description"
            defaultValue={issue?.description}
            render={({ field: { onChange, value } }) => (
              <SimpleMdeEditor
                placeholder="Description"
                onChange={onChange}
                value={value as string}
              />
            )}
          />
          {
            <CalloutHeader color="red">
              {errors.description?.message}
            </CalloutHeader>
          }
          <Button onClick={() => setSuccessfulMessage("")}>
            Submit New Issue
            {isSubmitting && <Spinner />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
