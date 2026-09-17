import { z } from "zod";

const MINIMUM_PROPERTY_BUDGET = 4_000_000;

export const ssoRealtyFormSchema = z.object({
    mobileNumber: z
        .string()
        .trim()
        .regex(
            /^[6-9]\d{9}$/,
            "A valid registered mobile number is required."
        ),

    propertyLocation: z
        .string()
        .trim()
        .min(
            1,
            "Please select a property location."
        ),

    propertyBudget: z
        .string()
        .trim()
        .min(
            1,
            "Property budget is required."
        )
        .regex(
            /^\d+$/,
            "Property budget must contain numbers only."
        )
        .refine(
            (value) =>
                Number(value) >= MINIMUM_PROPERTY_BUDGET,
            {
                error:
                    "Property budget must be at least ₹40,00,000.",
            }
        ),

    consent: z
        .boolean()
        .refine(
            (isAccepted) => isAccepted,
            {
                error:
                    "You must accept the terms and conditions before submitting.",
            }
        ),
});

export type SsoRealtyFormValues = z.infer<
    typeof ssoRealtyFormSchema
>;