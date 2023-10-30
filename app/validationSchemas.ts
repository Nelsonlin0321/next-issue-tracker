import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string({
    invalid_type_error: "Description is required",
  }).min(1, "Description is required"),
});
