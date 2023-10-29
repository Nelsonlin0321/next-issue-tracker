"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: String;
  description: String;
}

const NewIssuePage = () => {
  const { register, handleSubmit, control } = useForm<IssueForm>();
  const router = useRouter();
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <div className=" max-w-xl space-y-3">
        <TextField.Root className="">
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
  );
};

export default NewIssuePage;
