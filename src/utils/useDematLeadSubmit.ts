"use client";

import { useCallback } from "react";
import type {
    UseFormReset,
    UseFormSetError,
} from "react-hook-form";

import { getApiErrorMessage } from "@/services/api/apiErrorHandler";
import { submitDematLead } from "@/services/demat/dematAccount.service";
import { showErrorToast } from "@/services/toast/toast.service";
import { getJunkNames } from "@/services/validation/validationData.service";

import {
    getDematAttributionData,
    getDeviceType,
} from "@/utils/dematAttribution.utils";
import { buildDematRedirectUrl } from "@/utils/dematRedirect.utils";

import type { DematAccountFormValues } from "@/validations/forms/dematAccountForm.schema";

interface UseDematLeadSubmitOptions {
    setError: UseFormSetError<DematAccountFormValues>;
    reset: UseFormReset<DematAccountFormValues>;
    /**
     * What a cleared form goes back to. The hero keeps its consent box ticked
     * the way the Figma frame draws it, so the two callers do not share one
     * blank state.
     */
    defaultValues: DematAccountFormValues;
}

/**
 * The lead journey behind every "Get Started": screen the name against the
 * junk list, post the lead, then hand the visitor to the DIY account-opening
 * flow with the same attribution the form was filled under.
 *
 * Extracted from `DematAccountForm` so the home-page hero runs the identical
 * path rather than a second copy of it.
 */
export function useDematLeadSubmit({
    setError,
    reset,
    defaultValues,
}: UseDematLeadSubmitOptions) {
    return useCallback(
        async (formValues: DematAccountFormValues) => {
            let popupReference: Window | null = null;

            try {
                /*
                 * Open the tab directly from the user's submit
                 * action so browsers do not block the redirect
                 * after the asynchronous API request.
                 */
                popupReference = window.open("", "_blank");

                if (popupReference) {
                    popupReference.opener = null;
                }

                const junkNames = await getJunkNames();

                const normalizedFullName =
                    formValues.fullName.trim().toLowerCase();

                const isRestrictedName =
                    junkNames.includes(normalizedFullName);

                if (isRestrictedName) {
                    if (popupReference && !popupReference.closed) {
                        popupReference.close();
                    }

                    setError(
                        "fullName",
                        {
                            type: "validate",
                            message:
                                "Please enter a valid full name.",
                        },
                        {
                            shouldFocus: true,
                        }
                    );

                    return;
                }

                const attribution = getDematAttributionData();

                const result = await submitDematLead({
                    formValues,
                    attribution,
                    landingPageLink: window.location.href,
                    deviceType: getDeviceType(),
                });

                if (!result.success || !result.status) {
                    if (popupReference && !popupReference.closed) {
                        popupReference.close();
                    }

                    showErrorToast(result.message);
                    return;
                }

                const redirectUrl = buildDematRedirectUrl({
                    fullName: formValues.fullName,
                    mobileNumber: formValues.mobileNumber,
                    status: result.status,
                    attribution,
                });

                reset(defaultValues);

                if (popupReference && !popupReference.closed) {
                    try {
                        popupReference.location.href = redirectUrl;

                        return;
                    } catch {
                        popupReference.close();
                    }
                }

                window.location.assign(redirectUrl);
            } catch (error: unknown) {
                if (popupReference && !popupReference.closed) {
                    popupReference.close();
                }

                showErrorToast(getApiErrorMessage(error));
            }
        },
        [setError, reset, defaultValues]
    );
}
