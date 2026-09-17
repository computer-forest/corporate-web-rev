
import axios from "axios";
import { appConfig } from "@/config/app.config";
import { setupApiInterceptors } from "./apiInterceptors";

export const apiClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

setupApiInterceptors(apiClient);


