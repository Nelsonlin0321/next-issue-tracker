"use client";
import z from "zod";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import CalloutHeader from "@/app/components/CalloutHeader";
import { createIssueSchema } from "@/app/validationSchemas";
import Spinner from "@/app/components/Spinner";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [successfulMessage, setSuccessfulMessage] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await delay(1000); // mimic spinner
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
    <div className="max-w-xl">
      {<CalloutHeader color="green">{successfulMessage}</CalloutHeader>}
      <form onSubmit={onSubmit}>
        <div className="space-y-3">
          {<CalloutHeader color="red">{errorMessage}</CalloutHeader>}
          <TextField.Root>
            <TextField.Input placeholder="Issue Title" {...register("title")} />
          </TextField.Root>
          {<CalloutHeader color="red">{errors.title?.message}</CalloutHeader>}
          <Controller
            control={control}
            name="description"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <SimpleMDE
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

export default NewIssuePage;
