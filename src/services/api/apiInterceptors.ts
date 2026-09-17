import type { AxiosInstance } from "axios";

import { decryptPayload } from "@/services/security/decryption.service";
import { encryptPayload } from "@/services/security/encryption.service";

type EncryptedApiResponse = {
  status?: string;
  response?: string;
  message?: string;
};

function getClientId(): string {
  return (
    window.sessionStorage.getItem("clientid") ??
    window.localStorage.getItem("clientid") ??
    "no-client"
  );
}

function getAuthorizationToken(): string | null {
  return (
    window.sessionStorage.getItem("token") ??
    window.localStorage.getItem("token")
  );
}

export function setupApiInterceptors(
  apiClient: AxiosInstance
) {
  apiClient.interceptors.request.use(
    (config) => {

      const clientId = getClientId();
      const token = getAuthorizationToken();

      config.headers["client_id"] = clientId;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      if (
        config.encrypt === true &&
        config.data &&
        typeof config.data === "object"
      ) {
        config.data = encryptPayload(JSON.stringify(config.data));
        config.headers["Content-Type"] = "text/plain";
      }

      return config;
    },
    (error: unknown) => {
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (response) => {
      if (response.config.decrypt !== true) {
        return response;
      }

      const responseData =
        response.data as EncryptedApiResponse;

      if (
        responseData.status === "true" &&
        typeof responseData.response === "string" &&
        responseData.response.length > 0
      ) {
        const decryptedResponse = decryptPayload(
          responseData.response
        );

        response.data = JSON.parse(decryptedResponse);
      }

      return response;
    },
    (error: unknown) => {
      return Promise.reject(error);
    }
  );
}

// The request interceptor: does
// Reads decoded TCS token from sessionStorage.clientid
// → Attaches it as client_id header
// → Encrypts the request payload
// → Sets Content-Type to text/plain
// → Sends request to Go API

// The response interceptor: does
// Receives encrypted response
// → Decrypts response
// → Parses JSON
// → Returns normal data to sso.service.ts