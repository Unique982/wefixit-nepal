import { z } from "zod";

const isFileSystemReady =
  typeof window !== "undefined" && typeof window.File !== "undefined";

const strictCapitalizedNameRegex =
  /^[A-ZÀ-ÖØ-ß]([a-zà-öø-ÿ\s'-]*[a-zà-öø-ÿ])?$/;

export const BookingSchema = z.object({
  customerFirstName: z
    .string({ message: "First name must be a valid string" })
    .trim()
    .min(1, "First name is required") // Safe cross-version required handler
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .refine((val) => !/\d/.test(val), {
      message: "First name contains numbers. Numbers are strictly not allowed.",
    })
    .refine((val) => strictCapitalizedNameRegex.test(val), {
      message:
        "First letter must be capitalized (e.g., 'John'). Only letters, spaces, hyphens, and apostrophes are allowed.",
    }),

  customerLastName: z
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

  customerEmail: z
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
    ),
  customerPhone: z
    .string({
      required_error: "Phone number is required",
      invalid_type_error: "Phone number must be a valid string",
    })
    .trim()

    .refine((val) => /^\d+$/.test(val), {
      message:
        "Phone number must contain only numbers. Letters and symbols are not allowed.",
    })

    .refine((val) => /^(98|97)\d{8}$/.test(val), {
      message:
        "Invalid Nepali mobile number. Must start with 98 or 97 and be exactly 10 digits long.",
    }),

  customerAddress: z
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

  deviceType: z
    .string({ message: "Device type must be a valid string" })
    .trim()
    .min(1, "Device type is required")
    .min(2, "Device type must be at least 2 characters")
    .max(50, "Device type cannot exceed 50 characters")

    .refine((val) => /[a-zA-ZÀ-ÖØ-öø-ÿ]/.test(val), {
      message: "Device type must contain letters.",
    })

    .refine((val) => /^[a-zA-Z0-9À-ÖØ-öø-ÿ\s\-\/]+$/.test(val), {
      message:
        "Device type contains invalid characters. Only letters, numbers, spaces, hyphens, and slashes (/) are allowed.",
    }),
  deviceBrand: z
    .string({ message: "Brand must be a valid string" })
    .trim()
    .min(1, "Brand is required")
    .min(2, "Brand must be at least 2 characters")
    .max(50, "Brand cannot exceed 50 characters")

    .refine((val) => /[a-zA-ZÀ-ÖØ-öø-ÿ]/.test(val), {
      message: "Brand must contain letters.",
    })

    .refine((val) => /^[a-zA-Z0-9À-ÖØ-öø-ÿ\s\-\/]+$/.test(val), {
      message:
        "Brand contains invalid characters. Only letters, numbers, spaces, hyphens, and slashes (/) are allowed.",
    }),

  deviceModel: z
    .string({ message: "Model must be a valid string" })
    .trim()
    .min(1, "Model is required")
    .min(
      3,
      "Model name is too short. Please enter a valid model (e.g., 'iPhone 12', 'S23').",
    )
    .max(80, "Model cannot exceed 80 characters")

    .refine((val) => !/^[a-zA-Z]{4,}$/.test(val), {
      message:
        "Please enter a valid model name. Avoid typing random characters.",
    })

    .refine((val) => /[a-zA-Z0-9À-ÖØ-öø-ÿ]/.test(val), {
      message: "Model must contain alphanumeric characters.",
    })

    .refine((val) => /^[a-zA-Z0-9À-ÖØ-öø-ÿ\s\-\/()._+]+$/.test(val), {
      message:
        "Model contains invalid characters. Only standard text, numbers, and symbols like ( ), -, _, /, . are allowed.",
    }),

  issueDescription: z
    .string()
    .min(10, "Please describe the issue properly (minimum 10 characters)")
    .max(1000, "Description cannot exceed 1000 characters")
    .trim(),

  notes: z
    .string()
    .max(1000, "Notes cannot exceed 1000 characters")
    .optional()
    .or(z.literal("")),

  images: z
    .array(
      z
        .any()
        // १. पहिले फाइल अब्जेक्ट हो कि होइन चेक गर्ने (SSR Guard)
        .refine((file) => !isFileSystemReady || file instanceof File, {
          message: "Expected a valid image file object",
        })
        // २. फाइल साइज चेक (5MB भन्दा सानो हुनुपर्ने)
        .refine(
          (file) =>
            !isFileSystemReady ||
            (file instanceof File && file.size <= 5 * 1024 * 1024),
          { message: "Each image must be less than 5MB" },
        )

        .refine(
          (file) =>
            !isFileSystemReady ||
            (file instanceof File &&
              ["image/jpeg", "image/png"].includes(file.type)),
          { message: "Only .jpg, .jpeg, and .png formats are allowed" },
        ),
    )
    .max(5, "You can upload a maximum of 5 images")
    .optional(),
});

export type BookingInput = z.infer<typeof BookingSchema>;
