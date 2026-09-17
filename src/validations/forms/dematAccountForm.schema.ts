
import { z } from "zod";

export const dematAccountFormSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(1, "Full name is required.")
        .min(
            3,
            "Full name must contain at least 3 characters."
        )
        .max(
            100,
            "Full name must not exceed 100 characters."
        )
        .regex(
            /^[A-Za-z]+(?: [A-Za-z]+)*$/,
            "Full name must contain only letters and single spaces."
        )
        .refine(
            (value) => {
                const normalizedName =
                    value.replace(/\s+/g, "");

                return !/(.)\1\1/i.test(normalizedName);
            },
            {
                error:
                    "Full name must not contain 3 repeated characters.",
            }
        ),

    mobileNumber: z
        .string()
        .trim()
        .min(1, "Mobile number is required.")
        .regex(
            /^[6-9]\d{9}$/,
            "Enter a valid 10-digit Indian mobile number."
        ),

    consent: z
        .boolean()
        .refine(
            (isAccepted) => isAccepted,
            {
                error:
                    "You must agree before continuing.",
            }
        ),
});

export type DematAccountFormValues = z.infer<
    typeof dematAccountFormSchema
>;
