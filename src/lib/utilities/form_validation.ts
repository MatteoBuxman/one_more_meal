import { z, ZodError, type ZodIssue } from "zod";

const userSchema = z.object({
  // .min(8, "Password must be at least 8 characters long.")
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  // .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  // .regex(/[0-9]/, "Password must contain at least one digit.")
  // .regex(
  //   /[@$!%*?&#]/,
  //   "Password must contain at least one special character (e.g., @$!%*?&#)."
  // ),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .nonempty("Email is required."),
  password: z.string().nonempty("Password is required."),
});

type ValidationReturn = {
  success: boolean;
  error?: ZodError;
  data?: { email: string; password: string };
};

// Example function to validate user input
export function validateUserSignIn(
  email: string,
  password: string
): ValidationReturn {
  return userSchema.safeParse({ email, password });
}
