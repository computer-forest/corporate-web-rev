
import {
    showErrorToast,
    showSuccessToast,
} from "@/services/toast/toast.service";

import type {
    FormSubmissionHandler,
    FormSubmissionResult,
} from "@/types/forms/formSubmission.types";

export async function submitForm<T>(
    values: T,
    handler: FormSubmissionHandler<T>
): Promise<FormSubmissionResult> {
    const result = await handler(values);

    if (result.success) {
        showSuccessToast(result.message);
    } else {
        showErrorToast(result.message);
    }

    return result;
}
