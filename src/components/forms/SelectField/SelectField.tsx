
import type {
    FieldError,
    UseFormRegisterReturn,
} from "react-hook-form";

import styles from "./SelectField.module.scss";

type SelectOption = {
    label: string;
    value: string;
};

type SelectFieldProps = {
    id: string;
    label: string;
    options: SelectOption[];
    registration: UseFormRegisterReturn;
    error?: FieldError;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
};

export default function SelectField({
    id,
    label,
    options,
    registration,
    error,
    required = false,
    disabled = false,
    placeholder = "Please select",
}: Readonly<SelectFieldProps>) {
    const errorId = `${id}-error`;

    return (
        <div className={styles.field}>
            <label
                className={styles.label}
                htmlFor={id}
            >
                {label}

                {required && (
                    <>
                        <span
                            className={styles.requiredIndicator}
                            aria-hidden="true"
                        >
                            *
                        </span>

                        <span className="visually-hidden">
                            required
                        </span>
                    </>
                )}
            </label>

            <select
                id={id}
                disabled={disabled}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? errorId : undefined}
                className={`form-select ${styles.select} ${error ? "is-invalid" : ""
                    }`}
                {...registration}
            >
                <option value="">
                    {placeholder}
                </option>

                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <p
                    id={errorId}
                    className={styles.errorMessage}
                    role="alert"
                >
                    {error.message}
                </p>
            )}
        </div>
    );
}
