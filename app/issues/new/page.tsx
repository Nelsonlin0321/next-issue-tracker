"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className=" max-w-xl space-y-3">
      <TextField.Root className="">
        <TextField.Input placeholder="Issue Title" />
      </TextField.Root>
      <TextArea size="3" placeholder="Issue Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;