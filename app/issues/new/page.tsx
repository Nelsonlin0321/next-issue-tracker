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
  const { register, handleSubmit, control } = useForm<IssueForm>();

  const [errorMessages, setErrorMessages] = useState<String[]>();
  const router = useRouter();

  return (
    <div className="max-w-xl">
      {errorMessages &&
        errorMessages.map((mesg, index) => (
          <div key={index} className="mb-3">
            <Callout.Root color="red">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>{mesg}.</Callout.Text>
            </Callout.Root>
          </div>
        ))}

      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
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
            render={({ field: { onChange } }) => (
              <SimpleMDE placeholder="Description" onChange={onChange} />
            )}
          />
          <Button>Submit New Issue</Button>
        </div>
      </form>
    </div>
  );
};

export default NewIssuePage;
