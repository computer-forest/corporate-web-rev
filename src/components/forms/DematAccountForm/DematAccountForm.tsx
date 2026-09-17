
"use client";

import type { ChangeEvent } from "react";

import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ButtonLoader from "@/components/common/ButtonLoader/ButtonLoader";
import CheckboxField from "@/components/forms/CheckboxField/CheckboxField";
import InputField from "@/components/forms/InputField/InputField";

import { getApiErrorMessage } from "@/services/api/apiErrorHandler";
import { submitDematLead } from "@/services/demat/dematAccount.service";
import { showErrorToast } from "@/services/toast/toast.service";
import { getJunkNames } from "@/services/validation/validationData.service";

import {
    getDematAttributionData,
    getDeviceType,
} from "@/utils/dematAttribution.utils";
import { buildDematRedirectUrl } from "@/utils/dematRedirect.utils";

import {
    dematAccountFormSchema,
    type DematAccountFormValues,
} from "@/validations/forms/dematAccountForm.schema";

export default function DematAccountForm() {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<DematAccountFormValues>({
        resolver: zodResolver(
            dematAccountFormSchema
        ),
        defaultValues: {
            fullName: "",
            mobileNumber: "",
            consent: false,
        },
        mode: "onTouched",
    });

    const fullNameRegistration = register(
        "fullName",
        {
            onChange: (
                event: ChangeEvent<HTMLInputElement>
            ) => {
                const normalizedValue = event.target.value
                    .replace(/[^a-zA-Z\s]/g, "")
                    .replace(/^\s+/, "")
                    .replace(/\s+/g, " ")
                    .toUpperCase();

                event.target.value = normalizedValue;
                clearErrors("fullName");
            },
        }
    );

    const mobileNumberRegistration = register(
        "mobileNumber",
        {
            onChange: (
                event: ChangeEvent<HTMLInputElement>
            ) => {
                const normalizedValue = event.target.value
                    .replace(/\D/g, "")
                    .replace(/^[^6-9]+/, "")
                    .slice(0, 10);

                event.target.value = normalizedValue;
            },
        }
    );

    const onSubmit: SubmitHandler<
        DematAccountFormValues
    > = async (formValues) => {
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

            const normalizedFullName = formValues.fullName.trim().toLowerCase();

            const isRestrictedName = junkNames.includes(normalizedFullName);

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

            const attribution =
                getDematAttributionData();

            const result = await submitDematLead({
                formValues,
                attribution,
                landingPageLink: window.location.href,
                deviceType: getDeviceType(),
            });

            if (!result.success || !result.status) {
                if (
                    popupReference &&
                    !popupReference.closed
                ) {
                    popupReference.close();
                }

                showErrorToast(result.message);
                return;
            }

            const redirectUrl = buildDematRedirectUrl({
                fullName: formValues.fullName,
                mobileNumber:
                    formValues.mobileNumber,
                status: result.status,
                attribution,
            });

            reset({
                fullName: "",
                mobileNumber: "",
                consent: false,
            });

            if (
                popupReference &&
                !popupReference.closed
            ) {
                try {
                    popupReference.location.href =
                        redirectUrl;

                    return;
                } catch {
                    popupReference.close();
                }
            }

            window.location.assign(redirectUrl);
        } catch (error: unknown) {
            if (
                popupReference &&
                !popupReference.closed
            ) {
                popupReference.close();
            }

            showErrorToast(
                getApiErrorMessage(error)
            );
        }
    };

    return (
        <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            aria-label="Open Demat account form"
        >
            <InputField
                id="demat-full-name"
                label="Full name"
                placeholder="Enter your full name"
                autoComplete="name"
                registration={fullNameRegistration}
                error={errors.fullName}
                required
                maxLength={100}
            />

            <InputField
                id="demat-mobile-number"
                label="Mobile number"
                type="tel"
                placeholder="Enter your 10-digit mobile number"
                autoComplete="tel"
                inputMode="numeric"
                registration={
                    mobileNumberRegistration
                }
                error={errors.mobileNumber}
                required
                maxLength={10}
            />

            <CheckboxField
                id="demat-consent"
                label="I agree to the applicable terms and privacy policy."
                registration={register("consent")}
                error={errors.consent}
                required
            />

            <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
            >
                <ButtonLoader
                    isLoading={isSubmitting}
                    loadingText="Please wait..."
                >
                    Get Started
                </ButtonLoader>
            </button>
        </form>
    );
}