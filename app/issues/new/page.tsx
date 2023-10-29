"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
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
          <div key={index} className="mb-3">
            <Callout.Root color="red">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>{mesg}</Callout.Text>
            </Callout.Root>
          </div>
        ))}

      {successfulMessage && (
        <div className="mb-3">
          <Callout.Root color="green">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>{successfulMessage}</Callout.Text>
          </Callout.Root>
        </div>
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
