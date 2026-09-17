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
import SelectField from "@/components/forms/SelectField/SelectField";

import { getApiErrorMessage } from "@/services/api/apiErrorHandler";
import {
    submitRealtyCallback,
    type RealtyLocation,
} from "@/services/sso/ssoRealty.service";
import {
    showErrorToast,
    showSuccessToast,
} from "@/services/toast/toast.service";

import {
    ssoRealtyFormSchema,
    type SsoRealtyFormValues,
} from "@/validations/forms/ssoRealtyForm.schema";

type SsoRealtyFormProps = {
    mobileNumber: string;
    locations: RealtyLocation[];
    tcsToken: string;
    deviceType: string;
};

export default function SsoRealtyForm({
    mobileNumber,
    locations,
    tcsToken,
    deviceType,
}: Readonly<SsoRealtyFormProps>) {
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<SsoRealtyFormValues>({
        resolver: zodResolver(
            ssoRealtyFormSchema
        ),
        defaultValues: {
            mobileNumber,
            propertyLocation: "",
            propertyBudget: "",
            consent: false,
        },
        mode: "onTouched",
    });

    const propertyBudgetRegistration = register(
        "propertyBudget",
        {
            onChange: (
                event: ChangeEvent<HTMLInputElement>
            ) => {
                const normalizedValue =
                    event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 12);

                event.target.value = normalizedValue;
            },
        }
    );

    const locationOptions = locations.map(
        (location) => ({
            label: location.name,
            value: location.name,
        })
    );

    const onSubmit: SubmitHandler<
        SsoRealtyFormValues
    > = async (formValues) => {
        try {
            const result =
                await submitRealtyCallback({
                    formValues,
                    tcsToken,
                    deviceType,
                });

            if (!result.success) {
                showErrorToast(result.message);
                return;
            }

            showSuccessToast(result.message);

            reset({
                mobileNumber,
                propertyLocation: "",
                propertyBudget: "",
                consent: false,
            });
        } catch (error: unknown) {
            showErrorToast(
                getApiErrorMessage(error)
            );
        }
    };

    return (
        <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            aria-label="SBI Realty callback request form"
        >
            <div className="mb-3">
                <label
                    className="form-label fw-semibold"
                    htmlFor="realty-mobile-number"
                >
                    Registered mobile number
                </label>

                <input
                    id="realty-mobile-number"
                    type="tel"
                    className="form-control"
                    value={mobileNumber}
                    autoComplete="tel"
                    readOnly
                    aria-readonly="true"
                />

                <p className="form-text">
                    This mobile number is linked to your SBI
                    Securities account and cannot be edited.
                </p>
            </div>

            <input
                type="hidden"
                {...register("mobileNumber")}
            />

            <SelectField
                id="realty-property-location"
                label="Property location"
                placeholder="Select a property location"
                options={locationOptions}
                registration={register(
                    "propertyLocation"
                )}
                error={errors.propertyLocation}
                required
                disabled={isSubmitting}
            />

            <InputField
                id="realty-property-budget"
                label="Property budget"
                type="text"
                placeholder="Enter your property budget"
                inputMode="numeric"
                registration={
                    propertyBudgetRegistration
                }
                error={errors.propertyBudget}
                required
                disabled={isSubmitting}
                maxLength={12}
            />

            <p className="form-text mt-n2 mb-3">
                Minimum property budget: ₹40,00,000.
            </p>

            <CheckboxField
                id="realty-terms-consent"
                label="I agree to the applicable terms and conditions."
                registration={register("consent")}
                error={errors.consent}
                required
                disabled={isSubmitting}
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
                    Request a Callback
                </ButtonLoader>
            </button>
        </form>
    );
}