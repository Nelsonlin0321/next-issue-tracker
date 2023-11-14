"use client";
import { Button, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import { AlertDialog } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "@/app/components";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [hasError, setHasError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const deleteIssue = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setHasError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            {isDeleting && <Spinner />}
            Delete Issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure to delete this issue. The action cannot be undone.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={deleteIssue}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={hasError}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue cannot be deleted!
          </AlertDialog.Description>
          <Flex justify="end">
            <Button
              color="gray"
              variant="soft"
              onClick={() => setHasError(false)}
              mt="2"
            >
              OK
            </Button>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
