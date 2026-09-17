
import type { FieldError } from "react-hook-form";

import styles from "./FileUploadField.module.scss";

type FileUploadFieldProps = {
    id: string;
    label: string;
    error?: FieldError;
    required?: boolean;
    disabled?: boolean;
    accept?: string;
    onChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
};

export default function FileUploadField({
    id,
    label,
    error,
    required = false,
    disabled = false,
    accept,
    onChange,
}: Readonly<FileUploadFieldProps>) {
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

            <input
                id={id}
                type="file"
                accept={accept}
                disabled={disabled}
                onChange={onChange}
                className={`form-control ${styles.input} ${error ? "is-invalid" : ""
                    }`}
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? errorId : undefined}
            />

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
