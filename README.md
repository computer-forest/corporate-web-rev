# SBI Securities Website Revamp

> **Current security note:** The previous CSRF bootstrap has been removed following the AppSec/backend decision. Do not configure `NEXT_PUBLIC_CSRF_URL` or restore the old CSRF provider/gate/initializer. AES protection, `client_id`, and the existing SSO Bearer-token behavior remain active. General JWT integration is pending the formal AppSec/backend contract.


A Next.js App Router project for the SBI Securities marketing website, including accessible shared layouts, secured Go API integration, encrypted request/response handling, reusable forms, notifications, SEO configuration, and a future dashboard foundation.

## Technology Stack

- Next.js App Router
- TypeScript
- npm
- Bootstrap compiled CSS
- SCSS and SCSS Modules
- Axios
- React Hook Form
- Zod
- CryptoJS
- GitLab

## Prerequisites

Install the following before running the project:

- Node.js and npm approved by the project/team
- Git
- Access to the SBI Securities GitLab repository
- An approved `.env.local` file
- The local Go API running on `http://localhost:8080` when using the local environment

## Repository


https://gitlab.sbicapsec.com/investment-and-retail-project-team/new-website/sbisecurities-web


## Local Setup

Clone the repository:



git clone https://gitlab.sbicapsec.com/investment-and-retail-project-team/new-website/sbisecurities-web.git
cd sbisecurities-web


Install dependencies:



npm install


Create the local environment file from the template:

### PowerShell

powershell
Copy-Item .env.example .env.local


### Command Prompt

cmd
copy .env.example .env.local


Update `.env.local` with the approved local-development values supplied through the team's secure channel.

> Do not commit `.env.local`, `.env.uat`, or `.env.production`.

Start the local Go API on port `8080`, then start Next.js:



npm run dev


Open:


http://localhost:3000


## Environment Files


.env.local       → Local frontend with local Go API
.env.uat         → UAT configuration
.env.production  → Production configuration
.env.example     → Safe template committed to Git


Environment files other than `.env.example` are intentionally excluded from Git.

## Available Commands

### Local Development



npm run dev


This command:

- Validates `.env.local`
- Starts Next.js in development mode
- Watches source files for changes
- Rebuilds changed routes automatically
- Displays detailed development errors
- Creates or regenerates the `.next` directory

### Local Development Using UAT Configuration



npm run dev:uat


This validates and loads `.env.uat` before starting the development server.

### Local Production-Mode Build



npm run build
npm run start


`npm run start` requires an existing production build in `.next`. It does not create a build.

### UAT Build



npm run build:uat
npm run start:uat


### Production Build



npm run build:prod
npm run start:prod


Public `NEXT_PUBLIC_*` values are embedded during the build. Always run the correct build command before starting or deploying an environment.

### Lint



npm run lint


### Environment Validation



npm run validate:local
npm run validate:uat
npm run validate:prod


Validation checks required variables, URL formats, HTTPS requirements for remote environments, localhost usage, and accidental UAT URLs in production configuration.

## `npm run dev` vs `npm run start`

### `npm run dev`

Use while developing.

- Does not require a previous build
- Watches and rebuilds changed files
- Shows detailed development errors
- Recreates `.next` when necessary

### `npm run start`

Use to run an existing production build locally.

- Requires `npm run build` first
- Does not watch source changes
- Does not rebuild the application
- Fails when `.next` does not contain a valid production build

## Application Layout


RootLayout
├── Global providers
├── Bootstrap initialization
├── Secure-session initialization
├── Global loader
├── Toast container
├── Skip link
└── Route content

MarketingLayout
├── Header
├── Accessibility sidebar
├── Main content
└── Footer

DashboardLayout
└── Dashboard main content


### Layout Rules


src/app/layout.tsx
→ Applies to the entire application

src/app/(marketing)/layout.tsx
→ Applies only to routes inside the marketing route group

src/app/(dashboard)/layout.tsx
→ Applies only to routes inside the dashboard route group


Route-group names in parentheses do not appear in the URL.

## Server and Client Components

Next.js App Router components are Server Components by default.

Add `"use client"` only when a component needs features such as:

- `useState`
- `useEffect`
- `useRef` for browser interaction
- `usePathname`
- `useRouter`
- Event handlers such as `onClick` or `onChange`
- `localStorage` or `sessionStorage`
- `window`, `document`, or `navigator`
- Interactive forms
- Theme or font-size controls
- Browser-secured API calls
- Modals, offcanvas panels, carousels, or dropdown state

Keep a component as a Server Component when it only:

- Renders static markup
- Receives and renders props
- Defines SEO metadata
- Fetches data server-side
- Renders CMS content server-side
- Uses server-only APIs

Do not mark an entire page as a Client Component when only one small section needs browser behavior. Isolate that section in a Client Component.

## File Extension Convention


components/ and app pages/layouts → .tsx
contexts that render providers     → .tsx
services                           → .ts
config                             → .ts
utilities                          → .ts
constants                          → .ts
types                              → .ts
hooks                              → .ts unless they render JSX


Use `.tsx` only when the file contains JSX.

## Styling

Bootstrap compiled CSS and project SCSS are imported globally in the root layout:

tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";


Global SCSS files:


src/styles/_variables.scss
src/styles/_base.scss
src/styles/_mixins.scss
src/styles/_utilities.scss
src/styles/globals.scss


Use modern Sass `@use`, not deprecated `@import`.

Component-specific styles belong in SCSS Modules next to the component:


Header.tsx
Header.module.scss


Global CSS custom properties such as `--color-primary` and `--color-body-bg` are available to every component because they are defined globally on `:root`.

## API and Security Flow

Secured browser API calls follow this flow:


Component
→ Business-module service
→ Axios apiClient
→ Request interceptor
→ Client/auth headers
→ Optional AES request encryption
→ Go API
→ Optional AES response decryption
→ Service/component


Custom Axios request options:

ts
{
  encrypt: true,
  decrypt: true,
  withCredentials: true,
}


Use one service per business module, for example:


src/services/blog/blog.service.ts
src/services/demat/dematAccount.service.ts


Do not call Axios directly from UI components.


## Loader Strategy


Form submission         → ButtonLoader
Background content      → Skeleton loader later
Critical blocking flow  → Full-screen loader when justified
Route navigation        → Progress indicator later


Do not add artificial loading delays.

## Forms

Forms use:


React Hook Form
Zod
@hookform/resolvers


Reusable form components are under:


src/components/forms/


Available controls include:

- InputField
- CheckboxField
- TextareaField
- SelectField
- FileUploadField
- FormSection
- ButtonLoader

Form validation must retain accessible labels, `aria-invalid`, `aria-describedby`, and announced error messages.

## Notifications

Use the centralized toast service:

ts
showSuccessToast("Saved successfully.");
showErrorToast("Something went wrong.");
showInfoToast("Information message.");
showWarningToast("Warning message.");


Do not use browser `alert()` for application feedback.


## SSO Bridge and SBI Realty

The website provides a generic same-origin SSO bridge for approved post-login journeys.

Supported bridge formats:


/sso-page/:page/:clientid
/sso-page/:page/:clientid/:theme
/sso-page/:page/:clientid/:theme/:device


Supported destinations currently are:


sso-realty → /sso-realty
cgs-bond   → /cgs-bond


The legacy `[clientid]` route parameter actually contains an encoded TCS token. The bridge decodes it, exchanges it through `oauth/token`, stores the returned SBI access token in `sessionStorage`, and redirects in the same browser tab.

Legacy compatibility mapping:


clientid-encoded → Encoded TCS token
clientid         → Decoded TCS token
client_id        → Backend field/header receiving the decoded TCS token
token            → SBI access token


Security rules:

- Do not put the SBI access token in a URL.
- Do not log TCS tokens, SBI access tokens, or customer details.
- Keep destination routes in the explicit allowlist.
- Use `sessionStorage` for the SSO session.
- Keep the bridge and destination pages on the same origin and in the same browser tab.
- Reject direct destination access without a valid SSO session.

### SBI Realty Form

After SSO initialization, `/sso-realty`:

1. Retrieves the registered mobile number from `sbirealty/getClientDetails`.
2. Retrieves all valid property locations from `sbirealty/getLocation`.
3. Displays a single form with a read-only mobile number, location dropdown, property budget, and consent checkbox.
4. Validates a minimum property budget of ₹40,00,000.
5. Submits the callback request through `sbirealty/requestCallback`.

All Realty API calls reuse the shared authorization, AES request-encryption, and response-decryption interceptors.

## SEO

The project includes:

- Global metadata defaults
- Page-specific metadata support
- Canonical URLs
- Open Graph metadata
- Environment-aware `robots.txt`
- Production sitemap

Local and UAT environments block search-engine indexing. Production allows public routes while excluding technical, dashboard, and test routes.

## Git Branch Workflow

The SSO bridge and SBI Realty callback journey have been merged into both `uat` and `main`.

Current long-lived branches:


main → Production
uat  → UAT


Short-lived branches:


feature/* → New development
release/* → Optional approved/bundled releases
hotfix/*  → Urgent production fixes


### Normal Feature Flow


main
→ feature/*
→ Merge Request into uat
→ UAT testing and approval
→ Merge approved feature into main
→ Synchronize main back into uat


### Team Rules

- Do not push directly to `main` or `uat`
- Use Merge Requests
- Do not force-push shared branches
- Keep feature branches short-lived
- Delete feature branches after release
- Create hotfix branches from `main`
- Merge production hotfixes back into `uat`

Branch protection is planned and currently postponed.

## GitLab CI/CD Status

CI/CD setup is paused because no usable GitLab Runner is currently assigned to the project.

The runner test configuration is isolated on:


feature/gitlab-ci


Do not merge it until the infrastructure/GitLab administrator assigns a suitable Runner and confirms tags/executor details.

## Test Routes

The following temporary routes exist for QA:


/form-test
/demat-form-test


They are excluded from production crawler rules and the sitemap. Remove them when the real Figma-based sections use the corresponding components.

## Troubleshooting

### `npm run start` says no production build exists

Run:



npm run build
npm run start


### Environment validation fails

Check the appropriate environment file and confirm all required values are present and use valid HTTP/HTTPS URLs.


### API request receives CORS errors

Confirm the Go backend allows:


http://localhost:3000


### Bootstrap mobile menu or offcanvas does not open

Confirm `BootstrapClient` is included in the root layout and Bootstrap's bundle loads successfully.

### Environment changes are not reflected

Restart Next.js. For production/UAT public variables, rebuild using the appropriate build command.

## Project Context

Read the full architecture and implementation history in:


PROJECT_CONTEXT.md


Also follow:


AGENTS.md


The source code remains the final source of truth if documentation differs from the repository.

## Recent Foundation Additions

### Salesforce Chatbot

The Salesforce Embedded Messaging implementation is centralized in:


src/config/salesforceChatbot.config.ts
src/components/common/SalesforceChatbot/SalesforceChatbot.tsx


It is loaded only on marketing routes and only for production builds:


Local → Disabled
UAT → Disabled
Production → Enabled


Final chatbot behavior and WCAG 2.2 AA verification must occur on `https://www.sbisecurities.in`, because Salesforce does not allow the local or UAT origins.

### Security Headers

`next.config.ts` applies the following baseline headers globally:


X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: SAMEORIGIN
Permissions-Policy for unused browser capabilities


CSP is deferred until all third-party domains are known and must begin in report-only mode.

### Shared Junk-Name Validation

The marketing layout preloads the junk-name list once through:


ValidationDataInitializer
→ validationData.service.ts
→ masters/getjunkvalue


The service caches the pending request and normalized result in memory. Forms call `getJunkNames()` and receive cached or pending data rather than necessarily issuing another API request.

Exact matching is case-insensitive:


BANK → Blocked when "bank" is in the list
Rohit Bank → Allowed
Banker → Allowed


A full refresh, direct URL, or new tab creates a new application instance and calls the endpoint once again. Next.js client-side navigation preserves the cache.

### API Error Messages

Use:

ts
getApiErrorMessage(error)


The helper normalizes timeout, network, 400, 401, 403, 404, 408, 409, 422, 429, and 500+ errors. It supports `message`, legacy `messgae`, and `error` fields.

Interceptors do not show automatic toasts or redirect on 401. Components/services decide the correct UI behavior. Authentication-driven session cleanup is deferred until its contract exists.

### Google Tag Manager

GTM container:


GTM-WZ2F44N


GTM loads in local, UAT, and production. Every custom event includes:


app_environment: local | uat | production


Files:


src/config/analytics.config.ts
src/components/common/GoogleTagManager/GoogleTagManager.tsx
src/services/analytics/analytics.service.ts


Use:

ts
trackAnalyticsEvent("event_name", {
  non_personal_field: "value",
});


Never place customer names, mobile numbers, email, PAN, account details, client IDs, TCS tokens, SBI access tokens, or decrypted API/customer data in `dataLayer`.

The root layout contains the main GTM script and one hidden noscript iframe. GTM may load additional configured tags such as Meta/Facebook Pixel; those are controlled by the GTM workspace.


### Documentation Update Rule

Update `PROJECT_CONTEXT.md` and `README.md` in batches after at least three meaningful features, not after every small change.
## Current API Security and JWT Migration

The previous CSRF endpoint, cookie/header flow, provider, gate, initializer, service, environment variable, and blocking loader have been removed because the Go backend no longer supports that contract.

Current retained behavior:


client_id header
Existing SSO Authorization Bearer token
AES request encryption with `encrypt: true`
AES response decryption with `decrypt: true`
Specialized junk-data AES-128 decryption
Centralized API error messages
Baseline response security headers


Do not add `NEXT_PUBLIC_CSRF_URL` to any environment file.

JWT is planned but must not be implemented until AppSec/backend provide the official endpoint, payload, response, storage, expiry, refresh, affected-API and environment contract.

## Current Rendering Model

The removal of the global CSRF gate allows static marketing content, Header and Footer to appear in the initial server HTML. Next.js framework scripts and React Server Component payloads remain expected.


Static marketing content → Server-rendered
Blog API records         → Client-fetched after hydration
Interactive forms        → Client Components
SSO/sessionStorage flows → Client Components


Future CMS-driven Blog/Product SSR requires a server-side service or Next.js BFF/Route Handler after the JWT/server-to-server contract is known.

## Figma Implementation Readiness

The Marcom Figma is available. For protected company files, use exported desktop/mobile frames at original size, separate SVG/image assets, original frame widths, font details, variants and interaction notes. Implement one section at a time with responsive SCSS, semantic HTML, Server Components by default, Client Components only when required, and WCAG 2.2 AA validation.

