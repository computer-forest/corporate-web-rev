import axios from "axios";

type ApiErrorResponse = {
  message?: unknown;
  messgae?: unknown;
  error?: unknown;
};

function getResponseMessage(responseData: unknown): string {
  if (!responseData || typeof responseData !== "object") {
    return "";
  }

  const apiError = responseData as ApiErrorResponse;

  const possibleMessages = [
    apiError.message,
    apiError.messgae,
    apiError.error,
  ];

  const validMessage = possibleMessages.find(
      (message): message is string =>
        typeof message === "string" &&
        message.trim().length > 0
    );

  return validMessage?.trim() ?? "";
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (
      error.code === "ECONNABORTED" ||
      error.code === "ETIMEDOUT"
    ) {
      return "The request timed out. Please try again.";
    }

    if (!error.response) {
      return "Unable to connect to the service. Please check your network connection and try again.";
    }

    const responseMessage =
      getResponseMessage(
        error.response.data
      );

    switch (error.response.status) {
      case 400:
        return (
          responseMessage ||
          "The request could not be processed. Please check the entered information."
        );

      case 401:
        return (
          responseMessage ||
          "The request could not be authorized. Please restart the secure journey."
        );

      case 403:
        return (
          responseMessage ||
          "You do not have permission to perform this action."
        );

      case 404:
        return (
          responseMessage ||
          "The requested service or information could not be found."
        );

      case 408:
        return "The request timed out. Please try again.";

      case 409:
        return (
          responseMessage ||
          "The request conflicts with existing information."
        );

      case 422:
        return (
          responseMessage ||
          "The submitted information could not be processed."
        );

      case 429:
        return "Too many requests were submitted. Please wait and try again.";

      default:
        if (
          error.response.status >= 500
        ) {
          return "The service is temporarily unavailable. Please try again later.";
        }

        return (
          responseMessage ||
          "Something went wrong. Please try again."
        );
    }
  }

  if (error instanceof Error) {
    return (
      error.message ||
      "Something went wrong. Please try again."
    );
  }

  return "Something went wrong. Please try again.";
}

// we can use it like this 

/* try {
  const response = await apiClient.get("/blogs");
  return response.data;
} catch (error) {
  throw new Error(getApiErrorMessage(error));
} */

