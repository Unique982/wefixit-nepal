// src/lib/validations/auth.ts
import { z } from "zod";

const emailRule = z
  .string()
  .min(1, "Email is required")
  .email("Enter a valid email (e.g., name@domain.com)");

const passwordRule = z
  .string()
  .min(6, "Password must be at least 6 characters");

export const loginSchema = z.object({
  email: emailRule,
  password: passwordRule,
});

export const forgotSchema = z.object({
  email: emailRule,
});

export const resetSchema = z
  .object({
    otp: z.string().length(6, "OTP must be exactly 6 digits"),
    newPassword: passwordRule,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotInput = z.infer<typeof forgotSchema>;
export type ResetInput = z.infer<typeof resetSchema>;
