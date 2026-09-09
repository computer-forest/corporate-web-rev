import { environment } from "@/environments/environment";

/** Prefixes an asset path with the deployment base path. */
export function publicPath(path: string) {
  const base = environment.basePath || "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
