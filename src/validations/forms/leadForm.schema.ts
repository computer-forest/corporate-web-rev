
import { z } from "zod";

export const leadFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required.")
    .min(
      2,
      "Full name must contain at least 2 characters."
    )
    .max(
      100,
      "Full name must not exceed 100 characters."
    )
    .regex(
      /^[A-Za-z ]+$/,
      "Full name must contain only letters and spaces."
    ),

  mobileNumber: z
    .string()
    .trim()
    .min(1, "Mobile number is required.")
    .regex(
      /^[6-9]\d{9}$/,
      "Enter a valid 10-digit Indian mobile number."
    ),

  emailAddress: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .max(
      254,
      "Email address must not exceed 254 characters."
    )
    .pipe(
      z.email({
        error: "Enter a valid email address.",
      })
    ),

  consent: z
    .boolean()
    .refine(
      (isAccepted) => isAccepted,
      {
        error:
          "You must agree before submitting the form.",
      }
    ),
});

export type LeadFormValues = z.infer<
  typeof leadFormSchema
>;
