import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z
    .string({
      invalid_type_error: "Description is required",
    })
    .min(1, "Description is required"),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
});

export const pathIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string({
      invalid_type_error: "Description is required",
    })
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
  assignedToUserId: z
    .string()
    .min(1, "Assigned User Id is required")
    .max(255)
    .optional()
    .nullable(),
});
