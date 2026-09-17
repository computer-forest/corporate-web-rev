
import type {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

import styles from "./TextareaField.module.scss";

type TextareaFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  rows?: number;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
};

export default function TextareaField({
  id,
  label,
  placeholder,
  rows = 4,
  registration,
  error,
  required = false,
  disabled = false,
  maxLength,
}: Readonly<TextareaFieldProps>) {
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

      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : undefined}
        className={`form-control ${styles.textarea} ${
          error ? "is-invalid" : ""
        }`}
        {...registration}
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
