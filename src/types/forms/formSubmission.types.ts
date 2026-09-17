
export type FormSubmissionResult = {
  success: boolean;
  message: string;
};

export type FormSubmissionHandler<T> = (
  values: T
) => Promise<FormSubmissionResult>;
