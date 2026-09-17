
"use client";

// import { useState } from "react";
import {
    useForm,
    type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ButtonLoader from "@/components/common/ButtonLoader/ButtonLoader";
import CheckboxField from "@/components/forms/CheckboxField/CheckboxField";
import InputField from "@/components/forms/InputField/InputField";

import { submitForm } from "@/services/forms/formSubmission.service";
import { submitLeadForm } from "@/services/forms/leadForm.service";


// import {
//     showErrorToast,
//     showSuccessToast,
// } from "@/services/toast/toast.service";

import {
    leadFormSchema,
    type LeadFormValues,
} from "@/validations/forms/leadForm.schema";

export default function LeadForm() {
    // const [submitMessage, setSubmitMessage] =
    //     useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<LeadFormValues>({
        resolver: zodResolver(leadFormSchema),
        defaultValues: {
            fullName: "",
            mobileNumber: "",
            emailAddress: "",
            consent: false,
        },
        mode: "onTouched",
    });


    const onSubmit: SubmitHandler<LeadFormValues> = async (formValues) => {
        const result = await submitForm(
            formValues,
            submitLeadForm
        );

        if (result.success) {
            reset();
        }
    };


    return (
        <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            aria-label="Lead enquiry form"
        >
            <InputField
                id="lead-full-name"
                label="Full name"
                placeholder="Enter your full name"
                autoComplete="name"
                registration={register("fullName")}
                error={errors.fullName}
                required
                maxLength={100}
            />

            <InputField
                id="lead-mobile-number"
                label="Mobile number"
                type="tel"
                placeholder="Enter your 10-digit mobile number"
                autoComplete="tel"
                inputMode="numeric"
                registration={register("mobileNumber")}
                error={errors.mobileNumber}
                required
                maxLength={10}
            />

            <InputField
                id="lead-email-address"
                label="Email address"
                type="email"
                placeholder="Enter your email address"
                autoComplete="email"
                inputMode="email"
                registration={register("emailAddress")}
                error={errors.emailAddress}
                required
                maxLength={254}
            />

            <CheckboxField
                id="lead-consent"
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
                    loadingText="Submitting..."
                >
                    Submit
                </ButtonLoader>
            </button>

            {/* {submitMessage && (
                <p
                    className="mt-3 mb-0"
                    role="status"
                    aria-live="polite"
                >
                    {submitMessage}
                </p>
            )} */}
        </form>
    );
}
