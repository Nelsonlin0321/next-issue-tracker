"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
import CalloutHeader from "@/app/components/CalloutHeader";
interface IssueForm {
  title: String;
  description: String;
}

interface ErrorResponse {
  message: string;
}

const NewIssuePage = () => {
  const { register, handleSubmit, control, reset } = useForm<IssueForm>();

  const [errorMessages, setErrorMessages] = useState<String[]>();
  const [successfulMessage, setSuccessfulMessage] = useState("");
  // const router = useRouter();

  return (
    <div className="max-w-xl">
      {errorMessages &&
        errorMessages.map((mesg, index) => (
          <CalloutHeader key={index} color="red">
            {mesg}
          </CalloutHeader>
        ))}

      {successfulMessage && (
        <CalloutHeader color="green">{successfulMessage}</CalloutHeader>
      )}

      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            setSuccessfulMessage("Issue has been successfully created!");
            reset();
            setErrorMessages([]);
          } catch (error) {
            setSuccessfulMessage("");
            const errorData = (error as AxiosError).response
              ?.data as ErrorResponse[];
            const errorMessages = errorData.map((item) => item.message);
            setErrorMessages(errorMessages);
          }
        })}
      >
        <div className="space-y-3">
          <TextField.Root>
            <TextField.Input placeholder="Issue Title" {...register("title")} />
          </TextField.Root>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <SimpleMDE
                placeholder="Description"
                onChange={onChange}
                value={value as string}
              />
            )}
          />
          <Button>Submit New Issue</Button>
        </div>
      </form>
    </div>
  );
};

export default NewIssuePage;
