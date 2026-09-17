
import type {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

import styles from "./InputField.module.scss";

type InputFieldProps = {
  id: string;
  label: string;
  type?: "text" | "email" | "tel" | "password" | "number";
  placeholder?: string;
  autoComplete?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
};

export default function InputField({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  registration,
  error,
  required = false,
  disabled = false,
  inputMode,
  maxLength,
}: Readonly<InputFieldProps>) {
  const errorId = `${id}-error`;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
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
        type={type}
        className={`form-control ${styles.input} ${
          error ? "is-invalid" : ""
        }`}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        disabled={disabled}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : undefined}
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
