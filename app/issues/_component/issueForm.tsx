"use client";
import z from "zod";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, DropdownMenu, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalloutHeader, Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { Issue, Status } from "@prisma/client";
import { CaretDownIcon } from "@radix-ui/react-icons";
import statusMap from "@/app/components/statusMap";
import DropdownStatusItem from "./dropdownStatusItem";
import { useRouter } from "next/navigation";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type IssueFormData = z.infer<typeof issueSchema>;

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
    resolver: zodResolver(issueSchema),
  });

  const router = useRouter();

  const [statusQuery, setStatusQuery] = useState({
    status: issue && issue.status,
    statusLabel: issue && statusMap[issue.status].label,
    statusColor: issue && statusMap[issue.status].color,
  });

  const changeStatusQuery = (status: Status) => {
    setStatusQuery({
      status: status,
      statusLabel: statusMap[status].label,
      statusColor: statusMap[status].color,
    });
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [successfulMessage, setSuccessfulMessage] = useState("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      // await delay(100); // mimic spinner
      if (issue) {
        const updatedData = { ...data, status: statusQuery.status };
        await axios.patch(`/api/issues/${issue.id}`, updatedData);
        router.push(`/issues/${issue.id}`);
        router.refresh();
      } else {
        await axios.post("/api/issues", data);
      }
      setSuccessfulMessage(`Issue has been successfully created!`);
      reset();
      setErrorMessage("");
    } catch (error) {
      setSuccessfulMessage("");
      setErrorMessage((error as AxiosError).message);
    } finally {
      setSubmitting(false);
    }
  });

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

          {issue && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button color={statusQuery.statusColor}>
                  {statusQuery.statusLabel}
                  <CaretDownIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownStatusItem
                  status="OPEN"
                  changeStatusQuery={changeStatusQuery}
                />
                <DropdownStatusItem
                  status="IN_PROGRESS"
                  changeStatusQuery={changeStatusQuery}
                />
                <DropdownStatusItem
                  status="CLOSED"
                  changeStatusQuery={changeStatusQuery}
                />
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}

          <CalloutHeader color="red">{errors.title?.message}</CalloutHeader>

          <Controller
            control={control}
            name="description"
            defaultValue={issue ? issue.description : ""}
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
            {issue ? "Update Issue" : "Submit New Issue"}
            {isSubmitting && <Spinner />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
