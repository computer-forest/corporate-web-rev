
import type { LeadFormValues } from "@/validations/forms/leadForm.schema";

import type {
    FormSubmissionResult,
} from "@/types/forms/formSubmission.types";

export async function submitLeadForm(
    values: LeadFormValues
): Promise<FormSubmissionResult> {
    try {
        // Temporary implementation.
        // Replace with encrypted API call later.

        console.log(
            "Submitting lead form:",
            values
        );

        await Promise.resolve();

        return {
            success: true,
            message:
                "Your information has been submitted successfully.",
        };
    } catch {
        return {
            success: false,
            message:
                "We could not submit your information. Please try again.",
        };
    }
}
