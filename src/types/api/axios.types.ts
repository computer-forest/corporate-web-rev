
import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    encrypt?: boolean;
    decrypt?: boolean;
  }

  export interface InternalAxiosRequestConfig {
    encrypt?: boolean;
    decrypt?: boolean;
  }
}
