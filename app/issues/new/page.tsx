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
// import { useRouter } from "next/navigation";

type IssueForm = z.infer<typeof createIssueSchema>;

interface ErrorResponse {
  message: string;
}

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

  // const [errorMessages, setErrorMessages] = useState<String[]>();
  const [successfulMessage, setSuccessfulMessage] = useState("");
  // const router = useRouter();

  return (
    <div className="max-w-xl">
      {<CalloutHeader color="green">{successfulMessage}</CalloutHeader>}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            setSuccessfulMessage("Issue has been successfully created!");
            reset();
          } catch (error) {
            setSuccessfulMessage("");
            console.log(error);
            // const errorData = (error as AxiosError).response
            //   ?.data as ErrorResponse[];
            // const errorMessages = errorData.map((item) => item.message);
          }
        })}
      >
        <div className="space-y-3">
          <TextField.Root>
            <TextField.Input placeholder="Issue Title" {...register("title")} />
          </TextField.Root>
          {errors.title && (
            <CalloutHeader color="red">{errors.title.message}</CalloutHeader>
          )}
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
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewIssuePage;
