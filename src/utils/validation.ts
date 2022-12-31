import type { TypeOf } from "zod";
import { z } from "zod";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(PASSWORD_REGEX),
});

export const createFeedSchema = z.object({
  url: z.string().url(),
});

export const params = z.object({
  id: z.number(),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type CreateFeedInput = TypeOf<typeof createFeedSchema>;
export type ParamsInput = TypeOf<typeof params>;
