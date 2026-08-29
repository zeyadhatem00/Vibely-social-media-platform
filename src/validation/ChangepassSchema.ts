import * as z from "zod";

export const changeSchema = z
  .object({
    password: z.string().nonempty("Password is required"),
    newPassword: z
      .string()
      .nonempty("New password required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
  })
  .refine((data) => data.newPassword !== data.password, {
    message: "New password must be different",
    path: ["newPassword"],
  });
