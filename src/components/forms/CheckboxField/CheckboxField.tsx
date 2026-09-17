
import type {
  FieldError,
  UseFormRegisterReturn,
} from "react-hook-form";

import styles from "./CheckboxField.module.scss";

type CheckboxFieldProps = {
  id: string;
  label: React.ReactNode;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  required?: boolean;
  disabled?: boolean;
};

export default function CheckboxField({
  id,
  label,
  registration,
  error,
  required = false,
  disabled = false,
}: Readonly<CheckboxFieldProps>) {
  const errorId = `${id}-error`;

  return (
    <div className={styles.field}>
      <div className={styles.checkboxWrapper}>
        <input
          id={id}
          type="checkbox"
          className={`form-check-input ${styles.checkbox} ${
            error ? "is-invalid" : ""
          }`}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          {...registration}
        />

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
      </div>

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
