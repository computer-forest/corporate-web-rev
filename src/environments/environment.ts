// Auto-selected from NEXT_PUBLIC_ENV at build time.
// Mirrors the Angular src/environments pattern: one shape, one entry per target.
const env = process.env.NEXT_PUBLIC_ENV;

export interface Environment {
  production: boolean;
  url: string;
  backendurl: string;
  basePath: string;
  contactEndpoint: string;
  analyticsId: string;
}

const environments: Record<string, Environment> = {
  production: {
    production: true,
    url: "https://www.fathomgrid.com/",
    backendurl: "https://api.fathomgrid.com",
    basePath: "",
    contactEndpoint: "/api/contact",
    analyticsId: "FG-PROD-01",
  },
  uat: {
    production: true,
    url: "https://uat.fathomgrid.com/",
    backendurl: "https://uat-api.fathomgrid.com",
    basePath: "",
    contactEndpoint: "/api/contact",
    analyticsId: "FG-UAT-01",
  },
  development: {
    production: false,
    url: "http://localhost:3000/",
    backendurl: "http://localhost:3000",
    basePath: "",
    contactEndpoint: "/api/contact",
    analyticsId: "",
  },
};

export const environment = environments[env ?? "development"];
export const currentEnvironment = env ?? "development";
