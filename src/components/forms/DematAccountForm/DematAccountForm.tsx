
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

import {
    normalizeFullNameInput,
    normalizeMobileNumberInput,
} from "@/utils/dematFormInput.utils";
import { useDematLeadSubmit } from "@/utils/useDematLeadSubmit";

import {
    dematAccountFormSchema,
    type DematAccountFormValues,
} from "@/validations/forms/dematAccountForm.schema";

const EMPTY_FORM: DematAccountFormValues = {
    fullName: "",
    mobileNumber: "",
    consent: false,
};

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
        defaultValues: EMPTY_FORM,
        mode: "onTouched",
    });

    const onSubmit: SubmitHandler<
        DematAccountFormValues
    > = useDematLeadSubmit({
        setError,
        reset,
        defaultValues: EMPTY_FORM,
    });

    const fullNameRegistration = register(
        "fullName",
        {
            onChange: (
                event: ChangeEvent<HTMLInputElement>
            ) => {
                event.target.value =
                    normalizeFullNameInput(
                        event.target.value
                    );

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
                event.target.value =
                    normalizeMobileNumberInput(
                        event.target.value
                    );
            },
        }
    );

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