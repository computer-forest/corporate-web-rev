import { environment } from "@/environments/environment";

export interface ApiResult<T> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

/**
 * Thin fetch wrapper. Mirrors the Angular ApiService: one place that knows the
 * base URL, the default headers and how a failure is shaped.
 */
class ApiService {
  private base = environment.backendurl.replace(/\/$/, "");

  private url(path: string) {
    return path.startsWith("http") ? path : `${this.base}${path.startsWith("/") ? path : `/${path}`}`;
  }

  async get<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
    return this.request<T>(path, { ...init, method: "GET" });
  }

  async post<T>(path: string, body: unknown, init?: RequestInit): Promise<ApiResult<T>> {
    return this.request<T>(path, {
      ...init,
      method: "POST",
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
      body: JSON.stringify(body),
    });
  }

  private async request<T>(path: string, init: RequestInit): Promise<ApiResult<T>> {
    try {
      const response = await fetch(this.url(path), init);
      const text = await response.text();
      const data = text ? (JSON.parse(text) as T) : undefined;

      if (!response.ok) {
        return { ok: false, status: response.status, error: "Request failed" };
      }
      return { ok: true, status: response.status, data };
    } catch {
      return { ok: false, status: 0, error: "Network unavailable" };
    }
  }
}

export const apiService = new ApiService();
