// src/lib/validations/auth.ts

import { z } from "zod";
const strictCapitalizedNameRegex =
  /^[A-ZÀ-ÖØ-ß]([a-zà-öø-ÿ\s'-]*[a-zà-öø-ÿ])?$/;

const emailRule = z
  .string({ message: "Email must be a valid string" })
  .trim()
  .min(1, "Email address is required")

  .email("Invalid email format")

  .refine((val) => !/[A-Z]/.test(val), {
    message:
      "Capital letters are not allowed. Please enter your email in all lowercase characters.",
  })

  .regex(
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|edu|gov|mil|biz|info|me|np)$/,
    "Invalid or unsupported email domain suffix. Please use standard email addresses.",
  );
const passwordRule = z
  .string()
  .trim()
  .min(6, "Password must be at least 6 characters");

const otpRule = z
  .string()
  .trim()
  .length(6, "OTP must be exactly 6 digits")
  .regex(/^\d+$/, "OTP must contain only numbers");

const phoneRule = z
  .string("Phone number is required")
  .trim()

  .refine((val) => /^\d+$/.test(val), {
    message:
      "Phone number must contain only numbers. Letters and symbols are not allowed.",
  })

  .refine((val) => /^(98|97)\d{8}$/.test(val), {
    message:
      "Invalid Nepali mobile number. Must start with 98 or 97 and be exactly 10 digits long.",
  });

export const loginSchema = z.object({
  email: emailRule,
  password: passwordRule,
});

export const forgotSchema = z.object({
  email: emailRule,
});

export const registerSchema = z.object({
  firstName: z
    .string({ message: "First name must be a valid string" })
    .trim()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .refine((val) => !/\d/.test(val), {
      message: "First name contains numbers. Numbers are strictly not allowed.",
    })
    .refine((val) => strictCapitalizedNameRegex.test(val), {
      message:
        "First letter must be capitalized (e.g., 'John'). Only letters, spaces, hyphens, and apostrophes are allowed.",
    }),
  lastName: z
    .string({ message: "Last name must be a valid string" })
    .trim()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .refine((val) => !/\d/.test(val), {
      message: "Last name contains numbers. Numbers are strictly not allowed.",
    })
    .refine((val) => strictCapitalizedNameRegex.test(val), {
      message:
        "First letter must be capitalized (e.g., 'Doe'). Only letters, spaces, hyphens, and apostrophes are allowed.",
    }),
  email: emailRule,
  phone: phoneRule,
  currentAddress: z
    .string({ message: "Address must be a valid string" })
    .trim()
    .min(1, "Address is required")
    .min(
      5,
      "Address is too short. Please provide a more specific location (e.g., 'New Road, Kathmandu').",
    )
    .max(200, "Address cannot exceed 200 characters")

    .refine((val) => /[a-zA-ZÀ-ÖØ-öø-ÿ]/.test(val), {
      message: "Address must contain letters, not just numbers or symbols.",
    })

    .refine((val) => /^[a-zA-Z0-9À-ÖØ-öø-ÿ\s,.\-\/]+$/.test(val), {
      message:
        "Address contains invalid symbols. Only letters, numbers, spaces, commas, hyphens, and slashes (/) are allowed.",
    }),
  password: passwordRule,
});
export const otpSchema = z
  .object({
    email: z.string().email(),
    otp: otpRule,
    newPassword: z.string().min(8, "Min 8 characters"),
    confirmNewPassword: z.string().min(8, "Min 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotInput = z.infer<typeof forgotSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
