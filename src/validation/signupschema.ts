import * as z from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    username: z
      .string()
      .nonempty("User Name is required")
      .min(3, "User Name must be at least 3 characters long"),
    password: z
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    rePassword: z.string().nonempty("Confirm password is required"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    dateOfBirth: z
      .string()
      .nonempty("date is required")
      .refine((datevalue) => {
        let currentyear = new Date().getFullYear();
        let selectedyear = new Date(datevalue).getFullYear();
        let age = currentyear - selectedyear;
        return age >= 18;
      }, "age must be 18 or older"),
    gender: z.enum(["male", "female"], "please choose your gender"),
  })
  .refine((data) => data.password == data.rePassword, {
    message: "password did not match",
    path: ["rePassword"],
  });
