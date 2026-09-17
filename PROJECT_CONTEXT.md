# SBI Securities Next.js Website — Complete Project Context

> [!IMPORTANT]
> **Current security architecture override:** The earlier CSRF implementation documented later in this file is historical only. AppSec and the Go backend team removed the CSRF endpoint and middleware. The Next.js CSRF provider, gate, initializer, service, environment variable, cookie/header logic, and initial blocking loader were removed. Do not restore them. AES request/response protection, the `client_id` header, and the existing SSO Bearer-token flow remain active. A broader JWT migration is approved in principle but must not be implemented until AppSec/backend provide the token contract, storage policy, expiry, refresh, affected endpoints, and environment configuration.


> **Last updated:** 22 July 2026  
> **Project:** `sbisecurities-web`  
> **Local path:** `D:\sbicap\sbisecurities-web`

## 1. Instructions for a New Copilot Chat

Read this file and the repository's `AGENTS.md` completely before suggesting any changes. The repository code is the source of truth if it differs from this document.

Follow these working rules:

1. Work on **one feature and one step at a time**.
2. Do not advance until the developer explicitly says the current step is done.
3. When modifying an existing file, provide the **complete replacement file**.
4. Before suggesting a new file/folder, check whether the project already has an equivalent file. Do not create duplicate services or utilities.
5. Keep explanations concise unless the developer asks for detail.
6. Preserve WCAG 2.2 AA accessibility, security, and environment separation in every change.
7. Do not assume backend contracts. Use actual request/response payloads supplied by the developer.
8. Avoid over-engineering. Extract hooks/components only when reuse or complexity justifies it.
9. Do not add artificial loader delays.
10. Run lint/build after completing a feature and commit completed milestones.

### Prompt to Use in a New Chat


I am continuing an existing SBI Securities Next.js project.

Read the attached PROJECT_CONTEXT.md and AGENTS.md completely before proposing changes. Treat the repository code as the source of truth if it differs from the document.

Continue one feature and one step at a time. Do not move ahead until I say the current step is done. Whenever modifying an existing file, provide the complete replacement file. Before suggesting a new file, check the established project structure and avoid duplicates.

Features completed: project foundation, common layouts, accessibility, loaders, secure Axios/API architecture, AES encryption/decryption, CSRF hardening, reusable forms, global toasts, secure Demat account-opening form, global error handling, and environment validation.

The next planned feature is SEO Foundation. First summarize the current state briefly, then propose only SEO Foundation Step 1.


---

## 2. Project Purpose and Scope

The project is a revamp of the SBI Securities marketing website, currently available at `https://www.sbisecurities.in/`, using Next.js.

### Primary focus

- Marketing website
- Home page
- Product pages
- Calculator pages
- Blog pages
- CMS-managed content delivered through Go APIs
- Forms, especially the Demat account-opening lead form

### Future scope

- Login and authenticated dashboard
- Protected routes
- Portfolio/orders/reports/profile modules
- Salesforce custom chatbot
- GitLab CI/CD
- Docker
- Next.js BFF/Route Handlers and greater SSR usage

---

## 3. Confirmed Technology Stack


Framework: Next.js App Router
Language: TypeScript
Package manager: npm
Styling: Bootstrap compiled CSS + SCSS
Component styling: SCSS Modules
Forms: React Hook Form + Zod + @hookform/resolvers
HTTP client: Axios
Encryption: crypto-js
Backend: Go/Gin APIs
Accessibility target: WCAG 2.2 AA-ready
CMS: Separate admin/CMS project writes content to shared data tables
Website content API: Existing secured Go API
Repository: Local Git currently; GitLab remote/CI planned
Containerization: Docker later


### create-next-app choices


TypeScript: Yes
ESLint: Yes
React Compiler: No
Tailwind CSS: No
src directory: Yes
App Router: Yes
Import alias: @/*
AGENTS.md: Yes


---

## 4. Environment Configuration

### Environment files


.env.local
.env.uat
.env.production
.env.example


Actual environment files are ignored by Git. `.env.example` is committed.

### Expected variables

env
NEXT_PUBLIC_APP_ENV=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_CMS_BASE_URL=
NEXT_PUBLIC_REDIRECTION_URL=
NEXT_PUBLIC_CSRF_URL=
NEXT_PUBLIC_DEMAT_REDIRECT_URL=


### Local

env
NEXT_PUBLIC_APP_ENV=local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1/
NEXT_PUBLIC_CMS_BASE_URL=https://awsuat.sbisecurities.in/services/
NEXT_PUBLIC_REDIRECTION_URL=http://localhost:3000
NEXT_PUBLIC_CSRF_URL=http://localhost:8080/api/csrf-token
NEXT_PUBLIC_DEMAT_REDIRECT_URL=https://udn.sbisecurities.in/diy/mobile-home-otp


Local Next.js runs on port `3000`; local Go API runs on port `8080`. Local Demat submissions redirect to the UAT account-opening journey.

### UAT

env
NEXT_PUBLIC_APP_ENV=uat
NEXT_PUBLIC_SITE_URL=https://awsuat.sbisecurities.in/
NEXT_PUBLIC_API_BASE_URL=https://awsuat.sbisecurities.in/apiconnect/
NEXT_PUBLIC_CMS_BASE_URL=https://awsuat.sbisecurities.in/services/
NEXT_PUBLIC_REDIRECTION_URL=https://awsuat.sbisecurities.in/
NEXT_PUBLIC_CSRF_URL=https://awsuat.sbisecurities.in/services/api/csrf-token
NEXT_PUBLIC_DEMAT_REDIRECT_URL=https://udn.sbisecurities.in/diy/mobile-home-otp


### Production

env
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_SITE_URL=https://www.sbisecurities.in/
NEXT_PUBLIC_API_BASE_URL=https://www.sbisecurities.in/apiconnect/
NEXT_PUBLIC_CMS_BASE_URL=https://www.sbisecurities.in/apiconnect/
NEXT_PUBLIC_REDIRECTION_URL=https://www.sbisecurities.in/
NEXT_PUBLIC_CSRF_URL=https://www.sbisecurities.in/services/api/csrf-token
NEXT_PUBLIC_DEMAT_REDIRECT_URL=https://diy.sbisecurities.in/open-demat-account/mobile-home-otp


> Verify final CMS and CSRF production/UAT paths with deployment/backend teams before release.

### Central app config

File:


src/config/app.config.ts


Contains:

ts
export const appConfig = {
  env: process.env.NEXT_PUBLIC_APP_ENV || "local",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:8080/api/v1/",
  cmsBaseUrl:
    process.env.NEXT_PUBLIC_CMS_BASE_URL ||
    "https://awsuat.sbisecurities.in/services/",
  redirectionUrl:
    process.env.NEXT_PUBLIC_REDIRECTION_URL ||
    "http://localhost:3000",
  csrfUrl:
    process.env.NEXT_PUBLIC_CSRF_URL ||
    "http://localhost:8080/api/csrf-token",
  dematRedirectUrl:
    process.env.NEXT_PUBLIC_DEMAT_REDIRECT_URL ||
    "https://udn.sbisecurities.in/diy/mobile-home-otp",
};

export const isProduction = appConfig.env === "production";
export const isUat = appConfig.env === "uat";
export const isLocal = appConfig.env === "local";


### npm scripts

The current `package.json` scripts include environment validation:

json
"scripts": {
  "validate:local": "env-cmd -f .env.local node scripts/validate-env.mjs",
  "validate:uat": "env-cmd -f .env.uat node scripts/validate-env.mjs",
  "validate:prod": "env-cmd -f .env.production node scripts/validate-env.mjs",
  "dev": "npm run validate:local && next dev",
  "dev:uat": "npm run validate:uat && env-cmd -f .env.uat next dev",
  "build": "npm run validate:local && next build",
  "build:uat": "npm run validate:uat && env-cmd -f .env.uat next build",
  "build:prod": "npm run validate:prod && env-cmd -f .env.production next build",
  "start": "next start",
  "start:uat": "env-cmd -f .env.uat next start",
  "start:prod": "env-cmd -f .env.production next start",
  "lint": "eslint"
}


Important:

- `NEXT_PUBLIC_*` variables are embedded at build time.
- `start:prod` does not create a production build. Run `build:prod` first.
- A UAT build deployed to production continues using UAT URLs.
- Nginx serving a prebuilt artifact does not need the env files.

### Environment validation

File:


scripts/validate-env.mjs


Validates:

- Required variables exist
- Values are valid HTTP/HTTPS URLs
- Environment is `local`, `uat`, or `production`
- UAT/production use HTTPS
- UAT/production do not point to localhost
- Production does not contain known UAT URLs such as `awsuat` or `udn.sbisecurities.in`

Validation is complete and must remain in the project.

---

## 5. Styling Architecture

Bootstrap compiled CSS is imported in the root layout before custom SCSS:

tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";


Bootstrap SCSS was not used because its entry point caused an import-resolution error. Do not reintroduce it without a reason.

### Global style files


src/styles/_variables.scss
src/styles/_mixins.scss
src/styles/_utilities.scss
src/styles/_base.scss
src/styles/globals.scss


`globals.scss` uses modern Sass:

scss
@use "./variables";
@use "./base";
@use "./utilities";


Do not use deprecated Sass `@import`.

### Base tokens


Font: Open Sans, sans-serif
Weight: 400
Base size: 16px
Text color: #212529


These may change when Figma is ready.

### CSS custom properties

Global variables are CSS custom properties defined in `:root`, for example:

scss
--font-size-base
--color-text
--color-body-bg
--color-primary
--color-secondary
--color-border


Components can use `var(--color-primary)` without importing `_variables.scss` because `globals.scss` places them on the global root.

SCSS mixins and `$variables`, unlike CSS custom properties, require an explicit `@use` in each SCSS file.

### Generic utility classes

Located in:


src/styles/_utilities.scss


Includes:

scss
.section-padding {
  padding-top: 48px;
  padding-bottom: 48px;
}

.section-padding-top {
  padding-top: 48px;
}

.section-padding-bottom {
  padding-bottom: 48px;
}


### Component styles

Use `.module.scss` next to each component. Avoid global component classes unless they are genuine generic utilities.

---

## 6. Routing and Layouts

### Root layout


src/app/layout.tsx


Contains the only `<html>` and `<body>` elements and currently composes:


AccessibilityProvider
CsrfProvider
LoaderProvider
ToastProvider
ToastContainer
BootstrapClient
Skip link
LoaderRegistration
CsrfInitializer
Loader
CsrfGate
children


### Marketing route group


src/app/(marketing)/layout.tsx


Contains:


Header
AccessibilitySidebar
<main id="main-content">
Footer


Routes include:


/
/products
/calculators
/blogs
/form-test
/demat-form-test


Test routes remain temporarily for QA and should be removed when real Figma sections use the components.

### Dashboard route group


src/app/(dashboard)/layout.tsx
src/app/(dashboard)/dashboard/page.tsx


Dashboard is a future placeholder and does not use the marketing Header/Footer.

---

## 7. Header, Footer, and Bootstrap JS

### Header


src/components/layout/Header/Header.tsx
src/components/layout/Header/Header.module.scss


Features:

- Responsive Bootstrap navbar
- Home, Products, Calculators, Blogs
- Login and Open Demat Account links
- Active route using `usePathname`
- `aria-current="page"`
- Accessibility button opens Bootstrap offcanvas

Header is a Client Component because of `usePathname`.

The current Header is functional only; final Figma may redesign it.

### Footer


src/components/layout/Footer/Footer.tsx
src/components/layout/Footer/Footer.module.scss


### Bootstrap JS


src/components/common/BootstrapClient/BootstrapClient.tsx
src/types/bootstrap.d.ts


Bootstrap JavaScript is dynamically imported client-side. Offcanvas and mobile navbar use Bootstrap `data-bs-*` attributes; React `onClick` is not required for those behaviors.

---

## 8. Accessibility

Target: WCAG 2.2 AA-ready implementation.

Implemented:

- Semantic page structure
- Skip-to-main-content link
- Visible focus states
- Reduced-motion handling
- Accessible Header navigation
- `aria-current`
- Accessible form labels/errors
- Dark/light theme
- Font resize controls
- Accessibility offcanvas
- Preferences stored in localStorage

### Accessibility context


src/context/AccessibilityContext.tsx


Provides theme and font controls. Font range:


14px minimum
16px default
22px maximum
2px increments


Storage keys:


sbisecurities-theme
sbisecurities-font-size


### Accessibility sidebar


src/components/accessibility/AccessibilitySidebar/AccessibilitySidebar.tsx
src/components/accessibility/AccessibilitySidebar/AccessibilitySidebar.module.scss


The earlier `AccessibilityToolbar` was removed.

---

## 9. CSRF and Secure Session

### Backend contract

Go middleware requires for unsafe methods:


Cookie: XSRF-TOKEN
Header: X-XSRF-TOKEN


Both values must match.

CSRF endpoint returns:

json
{
  "message": "CSRF token issued"
}


and sets a non-HttpOnly `XSRF-TOKEN` cookie.

### CSRF files


src/services/security/csrf.service.ts
src/context/CsrfContext.tsx
src/components/common/CsrfInitializer/CsrfInitializer.tsx
src/components/common/CsrfGate/CsrfGate.tsx


Roles:


CsrfInitializer
→ Calls environment-driven CSRF endpoint
→ Sets csrfReady or csrfError

CsrfGate
→ Shows accessible initialization loader
→ Renders app only after CSRF is ready
→ Shows error and Retry button on failure


### Loader rule

The accessible secure-session loader appears only during initial page load/full refresh while CSRF initializes.

Do not show it for:

- Normal API requests
- Background CMS/blog requests
- Client-side navigation

Do not add artificial delay.

### CORS

Go backend allowlist includes:


http://localhost:4200
http://localhost:3000
https://awsuat.sbisecurities.in
https://www.sbisecurities.in


---

## 10. Loader Strategy

### Global critical-operation loader


src/context/LoaderContext.tsx
src/components/common/Loader/Loader.tsx
src/components/common/Loader/Loader.module.scss


Counter-based, accessible, reduced-motion aware.

### Button loader


src/components/common/ButtonLoader/ButtonLoader.tsx


### Loader bridge


src/services/api/loaderService.ts
src/components/common/Loader/LoaderRegistration.tsx


Keep for manual critical operations.

### Strategy


Initial CSRF bootstrap → Secure-session loader
Background content → Skeleton later
Forms → ButtonLoader
Critical blocking flows → Full-screen loader when justified
Route transitions → Top progress bar later


Automatic full-screen loading was removed from Axios interceptors.

---

## 11. Axios and API Architecture

### Axios client


src/services/api/apiClient.ts


Uses `appConfig.apiBaseUrl`, 30-second timeout, and defaults to JSON. Encrypted calls are switched to `text/plain` by the interceptor.

### Interceptors


src/services/api/apiInterceptors.ts


Request interceptor:

- Reads `XSRF-TOKEN` cookie
- Sends `X-XSRF-TOKEN`
- Reads `clientid` from localStorage
- Sends `client_id`
- Reads `token` from localStorage
- Sends Bearer Authorization when present
- Encrypts object body when `encrypt: true`
- Sets `Content-Type: text/plain`

Response interceptor:

- Decrypts only when `decrypt: true`
- Reads `status` and encrypted `response`
- AES-decrypts and JSON-parses response
- Replaces `response.data` with decrypted data

### Custom Axios options


src/types/api/axios.types.ts


ts
encrypt?: boolean;
decrypt?: boolean;


### Error helper


src/services/api/apiErrorHandler.ts


Provides `getApiErrorMessage(error)`.

### Service rule

Use one service per business module, not one service per endpoint:


src/services/blog/blog.service.ts
src/services/demat/dematAccount.service.ts
src/services/forms/leadForm.service.ts


Do not call Axios directly from UI components.

---

## 12. Encryption

### Standard API encryption

Files:


src/services/security/security.constants.ts
src/services/security/encryption.service.ts
src/services/security/decryption.service.ts


Algorithm:


AES-256
CBC
PKCS7
32-byte key
16-byte IV


Migrated Angular key/IV construction:

ts
ARR_A_PARTS = [
  "12345678",
  "90123456",
  "78901234",
  "56789012",
];

ARR_B_PARTS = [
  "12345678",
  "90123456",
];


This protects full Go API request/response communication.

### DIY redirect encryption


src/services/security/diyRedirectEncryption.service.ts


Algorithm:


AES-128
CBC
PKCS7
16-byte padded key and IV


Currently called with empty key/IV, matching Angular behavior; both become 16 `=` characters after padding.

This is used only for mobile and full name in the external Demat journey redirect URL.

### Security warning

Client-side keys are visible in browser bundles. Array splitting is only obfuscation. A future Next.js BFF/server-side architecture should move sensitive encryption and backend communication away from the browser where feasible.

---

## 13. Blog/CMS-Driven Content

The CMS is a separate admin project that writes blog/content data to shared tables. The Next.js website does not call a separate public CMS client. It calls secured Go APIs.

Do not create a duplicate `cmsClient.ts` unless backend architecture changes.

### Blog files


src/types/blog/blog.types.ts
src/services/blog/blog.service.ts
src/components/blog/BlogSection/BlogSection.tsx


### Blog service

Endpoint:


Local: http://localhost:8080/api/v1/blogs/fetchBlogs
UAT: https://awsuat.sbisecurities.in/apiconnect/blogs/fetchBlogs


Request:

json
{
  "flag": "getBlogsForHomePage"
}


Service uses:

ts
{
  encrypt: true,
  decrypt: true,
  withCredentials: true,
}


### Rendering architecture


HomePage → Server Component
BlogSection → Client Component


`BlogSection` owns `useEffect`, `useState`, loading/error/blog state and calls the secured browser service.

No custom `useHomePageBlogs` hook was created because one use case did not justify another file.

No `BlogCard` final component was created because Figma is pending.

True SSR for secured public content is deferred until a Next.js BFF/Route Handler is designed.

---

## 14. Forms Foundation

Packages:


react-hook-form
zod
@hookform/resolvers


### Reusable components


src/components/forms/InputField/
src/components/forms/CheckboxField/
src/components/forms/TextareaField/
src/components/forms/SelectField/
src/components/forms/FileUploadField/
src/components/forms/FormSection/
src/components/forms/LeadForm/
src/components/forms/DematAccountForm/


### Accessibility pattern

- Labels connected with `htmlFor` and `id`
- Required indicator visible and screen-reader text
- `aria-invalid`
- `aria-describedby`
- Error elements use `role="alert"`
- Keyboard-friendly native inputs
- Button disabled during submission

### Lead form


src/validations/forms/leadForm.schema.ts
src/services/forms/leadForm.service.ts
src/components/forms/LeadForm/LeadForm.tsx


The Lead service remains a mock until a real API is provided.

### Submission architecture


src/types/forms/formSubmission.types.ts
src/services/forms/formSubmission.service.ts


Standard UI result:

ts
{
  success: boolean;
  message: string;
}


Flow:


Form component
→ submitForm()
→ Form-specific service
→ FormSubmissionResult
→ Toast


---

## 15. Toast System

Files:


src/context/ToastContext.tsx
src/components/common/ToastContainer/ToastContainer.tsx
src/components/common/ToastContainer/ToastContainer.module.scss
src/services/toast/toast.service.ts


Capabilities:

- Success/error/info/warning
- Auto-dismiss after 4 seconds
- Manual dismiss
- Duplicate prevention by message and type
- Slide/fade entry animation
- Reduced-motion support
- Globally registered in root layout

Convenience functions:

ts
showSuccessToast()
showErrorToast()
showInfoToast()
showWarningToast()


---

## 16. Secure Demat Account-Opening Integration

Status: Complete and tested end-to-end.

### Files


src/validations/forms/dematAccountForm.schema.ts
src/types/demat/dematAccount.types.ts
src/services/demat/dematAccount.service.ts
src/services/security/diyRedirectEncryption.service.ts
src/utils/dematAttribution.utils.ts
src/utils/dematRedirect.utils.ts
src/components/forms/DematAccountForm/DematAccountForm.tsx
src/app/(marketing)/demat-form-test/page.tsx


### Fields


Full name
Mobile number
Mandatory consent checkbox


### Validation

- Full name required
- Minimum 3 characters
- Letters and single spaces only
- Blocks three repeated characters
- Uppercases normalized input
- Mobile must be a valid 10-digit Indian number beginning with 6–9
- Consent mandatory

### API


microsite/lead/savedetails


Request flag:


SaveLandingpagedetails


Payload includes raw name/mobile, entry type, current landing-page URL, attribution/UTM fields and device type.

Existing standard API interceptors perform AES-256 request encryption and response decryption.

Legacy backend response may use misspelled `messgae`; the service supports both `messgae` and `message`.

Mapped statuses:


valid
exhausted
internal_server_error


### Attribution and redirect utilities


src/utils/dematAttribution.utils.ts
→ Reads query params and device type

src/utils/dematRedirect.utils.ts
→ DIY encrypts name/mobile
→ Applies /slash, /plus, /equal replacements
→ Builds environment-driven redirect URL


### Redirect flow

- Blank tab opens synchronously on submit to avoid popup blocking
- API executes
- On success, blank tab navigates to account-opening journey
- If popup navigation fails, current tab redirects
- On API failure, popup closes and error toast appears
- Button is disabled while submitting

Redirects:


Local/UAT:
https://udn.sbisecurities.in/diy/mobile-home-otp

Production:
https://diy.sbisecurities.in/open-demat-account/mobile-home-otp


The standard AES-256 and DIY AES-128 do not encrypt the same thing twice:


AES-256 → Whole Go API request/response
DIY AES-128 → Name and mobile in redirect URL


---


## 17. Secure SSO Bridge and SBI Realty Journey

Status: Complete, tested locally, merged into both `uat` and `main`.

### Purpose

The separate post-login application redirects users into this website through a dedicated SSO bridge URL. The bridge exchanges the incoming encoded TCS token for an SBI access token, creates a tab-scoped session, and redirects the user to an approved same-origin destination page.

### Supported Bridge Routes

One generic optional catch-all route supports all legacy route formats:


/sso-page/:page/:clientid
/sso-page/:page/:clientid/:theme
/sso-page/:page/:clientid/:theme/:device


Next.js file:


src/app/(marketing)/sso-page/[page]/[clientid]/[[...options]]/page.tsx


Approved destinations currently are:


sso-realty → /sso-realty
cgs-bond   → /cgs-bond


The destination is selected through an explicit allowlist. Arbitrary external redirects are rejected.

### Token Terminology

The legacy route and backend contract use names that do not accurately describe the values:


URL parameter [clientid]       → Encoded TCS token
sessionStorage clientid-encoded → Encoded TCS token
sessionStorage clientid         → Decoded TCS token
API field/header client_id      → Decoded TCS token
sessionStorage token            → SBI access token returned by oauth/token


Internal variables use clearer names such as:


encodedTcsToken
tcsToken
sbiAccessToken
destinationSlug
deviceType


Do not rename the legacy route parameter, storage keys, header, or API payload field without coordinating with all consumers and the Go backend.

### SSO Token Exchange

Service:


src/services/sso/sso.service.ts


Flow:


Post-login application opens approved SSO URL
→ Bridge validates destination
→ Restores /slash, /plus and /equal characters in TCS token
→ Stores decoded TCS token in sessionStorage
→ Calls POST oauth/token
→ Existing Axios interceptors add CSRF/client headers and encrypt request
→ Existing interceptor decrypts response
→ SBI access token is stored in sessionStorage
→ router.replace() redirects in the same browser tab


SSO session values use `sessionStorage`, not persistent `localStorage`. Axios now checks `sessionStorage` first and falls back to `localStorage` so existing Blog and Demat flows remain compatible.

This design requires the bridge and destination routes to use the same origin and browser tab. Current production routes are expected under:


https://www.sbisecurities.in


### Destination Pages


src/app/(marketing)/sso-realty/page.tsx
src/app/(marketing)/cgs-bond/page.tsx


Direct access without a valid SSO session is rejected with an accessible error state.

The CGS Bond page currently verifies the SSO session and is ready for its final business UI.

### SBI Realty Data and Form

Service:


src/services/sso/ssoRealty.service.ts


Form:


src/components/forms/SsoRealtyForm/SsoRealtyForm.tsx
src/validations/forms/ssoRealtyForm.schema.ts


After successful SSO redirect, the Realty page loads these APIs in parallel:


POST sbirealty/getClientDetails
POST sbirealty/getLocation


`getClientDetails` returns extensive customer data. The UI extracts and retains only the required registered mobile number. PAN, DOB, email, address, and other unnecessary customer details must not be displayed or logged.

`getLocation` returns all Realty locations. The service removes entries with empty names, trims names, sorts them alphabetically, and displays every valid API location in the form dropdown.

The complete Realty form contains:


Registered mobile number → Auto-filled and read-only
Property location        → API-driven dropdown
Property budget          → Numeric input, minimum ₹40,00,000
Terms consent            → Required checkbox
Request a Callback       → ButtonLoader during submission


Submission endpoint:


POST sbirealty/requestCallback


Payload contains:


MobileNo
location
PropertyBudget
ClientID (decoded TCS token)
source (device type)


The service supports both new-record and already-existing-record responses and shows centralized success/error toasts. Repeated submission is blocked while the request is active.

### SSO Loading UX

The bridge displays the main secure-session spinner during token exchange. The Realty page displays only a subtle accessible status message while retrieving registered details and locations. Do not add artificial delay or show two consecutive prominent spinners.

### SSO Security Rules


- Never put the SBI access token in the URL.
- Never log TCS tokens, SBI access tokens, or returned customer details.
- Keep the destination allowlist explicit.
- Store SSO values in sessionStorage only.
- Use same-tab navigation so sessionStorage remains available.
- Reject direct destination access without the required session values.
- Reuse the existing CSRF and AES request/response security interceptors.


---

## 18. Global Error Handling

Files:


src/app/error.tsx
src/app/global-error.tsx
src/app/not-found.tsx


### `error.tsx`

- Client Component
- Catches unexpected route/page/component rendering errors
- Accessible message
- Try Again recovery action
- Return Home
- Development-only console logging
- Displays error digest when available

### `global-error.tsx`

- Client Component
- Last-resort root-layout/application-shell error fallback
- Includes its own `<html>` and `<body>`

### `not-found.tsx`

- Custom 404
- Home and Support actions

Temporary error-test route was created, tested, and removed.

---

## 19. Completed Features


Feature 1  — Project Setup and Base Architecture
Feature 2  — Common Header, Footer, and Marketing Layout
Feature 3  — Accessibility Provider, Theme, Font Controls
Feature 4  — Loader System and ButtonLoader
Feature 5  — Axios/API Foundation, Real Blog API, CSRF Bootstrap
Feature 6  — Security Refactor and Explicit Encrypt/Decrypt Options
CSRF Hardening — Loading, Failure, Retry
Feature 7  — Forms Foundation
Feature 7.12 — Toast Foundation
Feature 7.13 — Form Submission Architecture
Blog Section Refactor — Server Page + Client Section
Demat Account Form Integration — Complete
Global Error Handling — Complete
Environment Validation — Complete
SEO Foundation — Complete
GitLab Repository, main and uat Branches — Complete
SSO Bridge and SBI Realty Callback Journey — Complete


---

## 20. Current Foundation Status and Pending Work

Foundation is strong and production-oriented, but the following remain:

### Next planned feature


SEO Foundation


Expected scope:

- Global metadata conventions
- Canonical URLs
- Open Graph defaults
- Social metadata
- `robots.ts`
- `sitemap.ts`
- Structured-data strategy
- CMS SEO-field mapping strategy

### Other pending foundation/business features


Next.js BFF / Route Handler architecture
True SSR for secured marketing content
Skeleton loaders after Figma
Final Figma-based Header/Footer/cards/banner
Carousel selection and integration
Salesforce chatbot script
TCS junk-name blacklist integration for the Demat form
Advanced file upload behavior
Real Contact/Callback APIs
Automated testing setup
Accessibility audit
Branch protection and CI/CD
Docker
Login/dashboard/authentication
Centralized safe production logging/monitoring


### BFF/SSR direction

Current secured browser APIs depend on:


Browser CSRF cookie
localStorage clientid/token
Client Axios interceptors
Client encryption


For true SSR and improved secret handling, future architecture should consider:


Server Component
→ Next.js Route Handler/BFF
→ Go API


Do not attempt to force the current browser security implementation into Server Components without designing the server-side contract.

---

## 21. Git Strategy

Recommended branches:


main       → Production
uat        → UAT
develop    → Integration
feature/*  → Feature work


Recommended flow:


feature/* → develop → uat → main


Suggested commits already used/planned:

bash
git commit -m "feat: setup Next.js base architecture"
git commit -m "feat: add common marketing header and footer"
git commit -m "feat: add accessibility controls and theme support"
git commit -m "feat: add global loader system"
git commit -m "feat: centralize API security and CSRF handling"
git commit -m "feat: add reusable forms and toast architecture"
git commit -m "feat: integrate secure Demat account opening journey"
git commit -m "feat: add global error handling and secure Demat journey"
git commit -m "feat: add environment validation for local UAT and production"


Remote GitLab and CI/CD are not yet configured.

---

## 22. Important Project Rules

1. TypeScript only; avoid explicit `any`.
2. Server Components by default.
3. Use `"use client"` only for state, effects, event handlers, browser APIs, custom client hooks, or secured browser API calls.
4. Isolate client-only API sections instead of making entire pages Client Components.
5. Only root layout contains `<html>` and `<body>`, except `global-error.tsx`, which replaces it on failure.
6. Bootstrap for grid/layout; SCSS Modules for component-specific styles.
7. Global generic utilities belong in `_utilities.scss`.
8. `@use`, not Sass `@import`.
9. Preserve WCAG 2.2 AA patterns.
10. One service per business module—not one service per endpoint.
11. UI components do not call Axios directly.
12. Reuse existing files and established folders; never create duplicates without checking.
13. API contract types must follow actual backend responses.
14. Use `encrypt: true`/`decrypt: true` only for APIs that require them.
15. Do not expose secrets via `NEXT_PUBLIC_*` beyond intentionally public browser config.
16. Do not auto-show the global loader for ordinary API calls.
17. Use ButtonLoader for forms.
18. Use toasts for action feedback; do not use browser `alert()`.
19. Do not add artificial delays.
20. Wait for Figma before final visual component extraction/design where appropriate.
21. Run `npm run lint` and the relevant build command after features.
22. Keep `PROJECT_CONTEXT.md` updated.
23. Commit completed milestones.
24. Provide complete file replacements when modifying existing files.
25. Work one step at a time and wait for explicit completion confirmation.

---

## 23. High-Level File Inventory

This is the known project structure created during the work. The repository remains the source of truth.


scripts/
└── validate-env.mjs

src/app/
├── layout.tsx
├── error.tsx
├── global-error.tsx
├── not-found.tsx
├── (marketing)/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── products/page.tsx
│   ├── calculators/page.tsx
│   ├── blogs/page.tsx
│   ├── form-test/page.tsx
│   ├── demat-form-test/page.tsx
│   ├── sso-page/[page]/[clientid]/[[...options]]/page.tsx
│   ├── sso-realty/page.tsx
│   └── cgs-bond/page.tsx
└── (dashboard)/
    ├── layout.tsx
    └── dashboard/page.tsx

src/components/
├── accessibility/AccessibilitySidebar/
├── blog/BlogSection/
├── common/
│   ├── BootstrapClient/
│   ├── ButtonLoader/
│   ├── CsrfGate/
│   ├── CsrfInitializer/
│   ├── Loader/
│   └── ToastContainer/
├── forms/
│   ├── CheckboxField/
│   ├── DematAccountForm/
│   ├── FileUploadField/
│   ├── FormSection/
│   ├── InputField/
│   ├── LeadForm/
│   ├── SelectField/
│   ├── SsoRealtyForm/
│   └── TextareaField/
└── layout/
    ├── Header/
    └── Footer/

src/config/
└── app.config.ts

src/context/
├── AccessibilityContext.tsx
├── CsrfContext.tsx
├── LoaderContext.tsx
└── ToastContext.tsx

src/services/
├── api/
│   ├── apiClient.ts
│   ├── apiErrorHandler.ts
│   ├── apiInterceptors.ts
│   └── loaderService.ts
├── blog/blog.service.ts
├── demat/dematAccount.service.ts
├── sso/
│   ├── sso.service.ts
│   └── ssoRealty.service.ts
├── forms/
│   ├── formSubmission.service.ts
│   └── leadForm.service.ts
├── security/
│   ├── csrf.service.ts
│   ├── decryption.service.ts
│   ├── diyRedirectEncryption.service.ts
│   ├── encryption.service.ts
│   └── security.constants.ts
└── toast/toast.service.ts

src/styles/
├── _base.scss
├── _mixins.scss
├── _utilities.scss
├── _variables.scss
└── globals.scss

src/types/
├── api/
│   ├── api.types.ts
│   ├── axios.types.ts
│   └── request.types.ts
├── blog/blog.types.ts
├── bootstrap.d.ts
├── demat/dematAccount.types.ts
└── forms/formSubmission.types.ts

src/utils/
├── cookie.utils.ts
├── dematAttribution.utils.ts
└── dematRedirect.utils.ts

src/validations/forms/
├── dematAccountForm.schema.ts
├── leadForm.schema.ts
└── ssoRealtyForm.schema.ts


---

## 24. Next Action

The urgent SSO bridge and SBI Realty callback journey are complete and merged into `uat` and `main`. CI/CD remains paused until a usable GitLab Runner is assigned. Testing and BFF/SSR remain intentionally deferred.

Recommended next action:


Wait for approved Figma and business/API requirements, then create a short-lived feature branch for the next real module.


Pending known item:


Migrate the Demat junk-name blacklist API/validation when the urgent SSO work is complete.


## 25. Additions After the SSO and Realty Batch

This section records the next completed batch. Treat the repository as the final source of truth if implementation details differ.

### 25.1 Salesforce Embedded Messaging Chatbot Foundation

Status: Complete and merged into `uat` and `main`.

Files:


src/config/salesforceChatbot.config.ts
src/components/common/SalesforceChatbot/SalesforceChatbot.tsx
src/app/(marketing)/layout.tsx


Salesforce deployment configuration:


Organization ID: 00D2w000008TDq8
Deployment name: SFDC_Test_ESD
Deployment URL: https://sbicapsec.my.site.com/ESWSFDCTestESD1762866056191
SCRT URL: https://sbicapsec.my.salesforce-scrt.com
Script URL: https://sbicapsec.my.site.com/ESWSFDCTestESD1762866056191/assets/js/bootstrap.min.js
Language: en_US
Hidden pre-chat field: chatreq = ""


Implementation decisions:


- Loaded with next/script using lazyOnload.
- Registered only in the marketing layout; dashboard routes do not load it.
- Initialization is guarded to prevent duplicates.
- Salesforce event payloads are parsed safely.
- Messaging event listeners are removed on component cleanup.
- Previous messaging sessions are cleared where required by the legacy behavior.
- Participant-change history is disabled.
- Chatbot/session/customer details are not logged.
- A Salesforce failure must never block the marketing website.


Environment behavior:


Local       → Disabled
UAT         → Disabled
Production  → Enabled


The component is rendered with:

tsx
{isProduction && <SalesforceChatbot />}


Salesforce rejected `http://localhost:3000` through CORS, and local/UAT origins will not be allowlisted. The final functional and WCAG 2.2 AA review must therefore be performed on the actual production origin:


https://www.sbisecurities.in


Required production accessibility checks:


- Keyboard access to the launcher and conversation UI
- Visible focus
- Accessible launcher name
- Correct focus entry and focus return
- Escape-key behavior where supported
- Screen-reader announcements
- 200% and 400% zoom/reflow
- Touch-target sizing
- Reduced-motion behavior
- No overlap with the accessibility sidebar or important controls


### 25.2 Baseline Security Response Headers

Status: Complete and merged into `uat` and `main`.

File:


next.config.ts


Headers applied to `/:path*`:


X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: SAMEORIGIN
Permissions-Policy: camera=(), microphone=(), geolocation=(), usb=(), payment=(), browsing-topics=()


Purpose:


- Prevent MIME-type sniffing.
- Avoid sending complete sensitive paths, including SSO paths, to external origins.
- Reduce clickjacking risk by preventing cross-origin framing.
- Disable browser capabilities the website does not currently require.


Intentionally deferred:


Content-Security-Policy
→ Wait until all Salesforce, GTM, Meta, CAPTCHA, image, font, iframe, API, and WebSocket domains are known. Introduce in report-only mode first.

Strict-Transport-Security
→ Coordinate with the production reverse proxy/load balancer.

Cross-Origin-Opener-Policy
→ May affect the Demat popup/redirect flow.

Cross-Origin-Embedder-Policy
→ May block third-party integrations.


### 25.3 Shared Junk-Name Validation and Cached Reference Data

Status: Complete and merged into `uat` and `main`.

Files:


src/services/security/decryption.service.ts
src/services/validation/validationData.service.ts
src/components/common/ValidationDataInitializer/ValidationDataInitializer.tsx
src/app/(marketing)/layout.tsx
src/components/forms/DematAccountForm/DematAccountForm.tsx


Endpoint:


POST masters/getjunkvalue


Request:

json
{
  "flag": "Junkvalue"
}


The request uses the normal API request encryption. The response contract differs from normal encrypted APIs:


Normal encrypted API response → AES-256 response value in `response`
Junk-value response            → AES-128 encrypted value in `data`


Special junk-data decryption:


Algorithm: AES-128
Mode: CBC
Padding: PKCS7
Key: client ID/TCS value padded or truncated to 16 characters
IV: same derived 16-character value


`decryptJunkData()` was added to the existing `decryption.service.ts`; no extra security file was created.

The shared validation-data service:


- Calls the endpoint once when required.
- Supports an already-decoded array or encrypted JSON string.
- Normalizes strings with trim() and lowercase conversion.
- Removes empty entries and duplicates.
- Caches the in-flight Promise so simultaneous consumers reuse one request.
- Caches the result in module memory for reuse across Client Components.


Cache behavior:


First application load             → Initializer calls the endpoint once.
Next.js client-side navigation     → Cache remains; no repeat request.
Form calls getJunkNames()           → Returns cache or the existing pending Promise.
Full refresh/direct URL/new tab    → JavaScript memory resets; endpoint runs once again.


`ValidationDataInitializer` is registered once in the marketing layout. Forms still call `getJunkNames()` at submission time so they can await cached/pending data and retain a safe fallback.

Exact matching rule:


API item: "Bank"

BANK          → Blocked
 bank         → Blocked
Rohit Bank    → Allowed
Banker        → Allowed


The submitted full name is trimmed and lowercased, then checked with exact array inclusion. Restricted names:


- Close the pre-opened Demat popup.
- Stop the Demat lead API call.
- Add an accessible full-name field error.
- Move focus to the full-name input.
- Remain visible rather than being silently removed.


### 25.4 Centralized API Error Messages

Status: Complete and merged into `uat` and `main`.

File:


src/services/api/apiErrorHandler.ts


`getApiErrorMessage(error)` now provides safe messages for:


ECONNABORTED / ETIMEDOUT → Request timeout
No response              → Network/service connection failure
400                      → Invalid request/input
401                      → Authorization or secure-journey failure
403                      → Permission denied
404                      → Resource/service not found
408                      → Request timeout
409                      → Conflict
422                      → Submitted data cannot be processed
429                      → Rate limiting
500+                     → Service temporarily unavailable


It supports backend response properties:


message
messgae
error


Responsibility split:


apiInterceptors.ts
→ Security headers, optional encryption/decryption, and rejection of the original Axios error.

apiErrorHandler.ts
→ Converts an error into a safe user-facing message.

Component/service catch block
→ Decides whether to render an error state, show a toast, close a popup, or retry.


Do not show automatic toasts inside the interceptor; components already own user feedback and duplicate notifications must be avoided.

Automatic 401 session clearing and login redirect remain deferred until the real authentication/session-expiry policy exists.

### 25.5 Google Tag Manager and Analytics Foundation

Status: Complete and ready to merge/merged according to current repository state. Confirm branch history in GitLab.

Files:


src/config/analytics.config.ts
src/components/common/GoogleTagManager/GoogleTagManager.tsx
src/services/analytics/analytics.service.ts
src/app/layout.tsx


Container:


GTM-WZ2F44N


Environment behavior:


Local       → GTM enabled; app_environment = "local"
UAT         → GTM enabled; app_environment = "uat"
Production  → GTM enabled; app_environment = "production"


GTM is registered once in the root layout so it applies across marketing, SSO, dashboard, error, and not-found routes.

The implementation includes both parts of the standard GTM installation:


- Main JavaScript loader through next/script with afterInteractive.
- Hidden noscript iframe fallback immediately inside body.


The noscript source must be an actual iframe, not a URL string:

tsx
<noscript>
  <iframe
    src={`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`}
    height="0"
    width="0"
    title="Google Tag Manager"
    style={{ display: "none", visibility: "hidden" }}
  />
</noscript>


The initial dataLayer event contains:


event: gtm.js
app_environment: local | uat | production


Centralized analytics service:

ts
trackAnalyticsEvent(eventName, eventData)


It initializes `window.dataLayer` if necessary and automatically adds `app_environment` to every custom event.

Privacy rules:


Never send full name, mobile number, email, PAN, account information, client ID,
TCS token, SBI access token, API response/customer details, or other personal data
to dataLayer unless an explicitly approved analytics requirement and privacy review says otherwise.


GTM may load additional configured tags such as Meta/Facebook Pixel (`connect.facebook.net/en_US/fbevents.js`). Those requests originate from the GTM container configuration, not directly from Next.js. Tracking prevention, ad blockers, corporate networks, or consent rules may block them without breaking the application.

Without GTM workspace access, frontend verification covers:


- gtm.js request loads.
- window.dataLayer exists.
- Initial environment event exists.
- Custom browser-console event can be pushed.
- Hidden fallback iframe is present in page source.
- GTM appears only once in the root layout.


The analytics/GTM team must separately verify triggers, tags, downstream delivery, and environment filtering.

### 25.6 CSRF Architecture Clarification

The Go backend issues the CSRF token through its CSRF endpoint.

Flow:


Full application load/new tab/full refresh
→ CsrfInitializer calls the configured Go CSRF endpoint
→ Go generates or reuses a CSRF value
→ Response sets XSRF-TOKEN through Set-Cookie
→ Browser stores the cookie automatically
→ CsrfGate renders application content after initialization


For protected requests:


Browser automatically sends Cookie: XSRF-TOKEN=<value>
Axios interceptor reads the cookie and sends X-XSRF-TOKEN: <same value>
Go middleware verifies both exist and match


The token-issuing endpoint does not require a pre-existing CSRF token. Subsequent protected state-changing requests normally do. The current Blog endpoint uses POST, so it also passes through the Go POST/CSRF middleware even though its business purpose is read-only.

The CSRF token is not an authentication token:


XSRF-TOKEN      → Anti-forgery value
SBI access token → Identity/authorization
TCS token        → SSO exchange input


The XSRF token cookie must remain readable by JavaScript because the interceptor copies it into the custom header. Authentication/session cookies should use HttpOnly where the backend architecture supports it.

### 25.7 Documentation and Working Preferences

Documentation update preference:


Update PROJECT_CONTEXT.md and README.md in batches after at least three meaningful features,
not after every small change.


Implementation preference:


- One feature and one step at a time.
- Do not advance until the current step is marked done.
- Give complete replacements for existing files.
- Check existing structure before proposing new files.
- Avoid over-engineering and unnecessary hooks, contexts, providers, or service files.
- Explain current behavior and debug it before redesigning architecture.
- Preserve WCAG 2.2 AA throughout every feature.
- Prefer Server Components, but use Client Components when browser storage, effects, forms, event handlers, or secured browser APIs require them.


### 25.8 Current Git and CI/CD State

Repository:


https://gitlab.sbicapsec.com/investment-and-retail-project-team/new-website/sbisecurities-web


Long-lived branches:


main → Production
uat  → UAT


Short-lived branch convention:


feature/*
release/* when a selective/bundled release is required
hotfix/* for production emergencies


CI/CD remains paused because the project has no usable assigned GitLab Runner. The runner connectivity experiment is isolated on:


feature/gitlab-ci


Do not merge that CI branch until the infrastructure team assigns a suitable runner and confirms executor, tags, and Node/npm availability.

Branch protection and formal approvals remain postponed while the small senior team establishes its workflow. Revisit them before regular production delivery or broader team access.

---

## 26. Updated Completed-Feature Snapshot


✅ Next.js App Router and TypeScript foundation
✅ Bootstrap and SCSS architecture
✅ Marketing and dashboard route groups
✅ Accessibility provider, theme, font controls, skip link, and reduced-motion support
✅ Loader, ButtonLoader, and secure-session loading strategy
✅ Axios API client and explicit encrypt/decrypt options
✅ Standard AES-256 request/response security
✅ CSRF bootstrap, gate, failure, and retry architecture
✅ Blog API and Server Page + Client Section composition
✅ React Hook Form + Zod reusable form foundation
✅ Toast notifications and duplicate prevention
✅ Secure Demat account-opening journey
✅ DIY AES-128 redirect encryption
✅ Global error, root error, and not-found handling
✅ Environment validation
✅ SEO metadata, robots, sitemap, canonical, and Open Graph foundation
✅ GitLab repository with main and uat branches
✅ Secure TCS-to-SBI SSO bridge for Realty and CGS Bond
✅ SBI Realty mobile auto-fill, locations, validation, and callback form
✅ Salesforce chatbot production-only foundation
✅ Baseline security response headers
✅ Shared junk-name validation and cached reference data
✅ Centralized API error messages
✅ Google Tag Manager and typed dataLayer foundation


## 27. Current Deferred and Pending Work


- Assign a GitLab Runner and complete CI/CD.
- Add automated tests after stable business UI/Figma or when the Runner is available.
- Design Next.js BFF/Route Handlers before final SSR CMS pages.
- Perform final accessibility audit after approved Figma implementation.
- Implement dynamic Blog/Product SEO and sitemap entries with real slugs/API fields.
- Add CSP in report-only mode after Salesforce/GTM/Meta/CAPTCHA domains are fully known.
- Coordinate HSTS with production infrastructure.
- Define authentication/session-expiry rules before automatic 401 cleanup or redirect.
- Add real CGS Bond functionality.
- Add approved analytics events to business actions without personal data.
- Test Salesforce chatbot functionality and accessibility on the real production origin.
- Build final Figma-based Header, Footer, banner, product, calculator, and Blog components.
- Add carousel only after approved requirements exist.
- Add CAPTCHA only when backend validation requirements exist.
- Add Docker and deployment/runtime strategy later.

## 28. CSRF Removal and Pending JWT Migration

Status: Complete and merged into both `uat` and `main`. The branches have no file differences after synchronization.

### Decision and reason

AppSec, backend developers, and project management decided to remove CSRF from the new website and move toward JWT-based API security. The Go backend removed its CSRF endpoint/middleware, so the frontend CSRF bootstrap began blocking the website and was no longer compatible with the backend.

### Removed frontend architecture

The following runtime behavior was removed and must not be restored unless AppSec explicitly changes the approved architecture:


CsrfProvider
CsrfInitializer
CsrfGate
csrf.service.ts
NEXT_PUBLIC_CSRF_URL
XSRF-TOKEN dependency
X-XSRF-TOKEN request header
Initial secure-session blocking loader
CSRF retry/error flow


Deleted obsolete source files:


src/context/CsrfContext.tsx
src/components/common/CsrfGate/CsrfGate.tsx
src/components/common/CsrfInitializer/CsrfInitializer.tsx
src/services/security/csrf.service.ts


Updated existing files:


src/app/layout.tsx
→ Removed CsrfProvider, CsrfInitializer and CsrfGate.
→ Route content now renders directly through `{children}`.

src/services/api/apiInterceptors.ts
→ Removed XSRF-TOKEN cookie lookup.
→ Removed X-XSRF-TOKEN request header.

src/config/app.config.ts
→ Removed csrfUrl.

scripts/validate-env.mjs
→ Removed NEXT_PUBLIC_CSRF_URL from required, remote and production validation.

.env.example / .env.local / .env.uat / .env.production
→ Removed NEXT_PUBLIC_CSRF_URL.


### Security behavior retained


- `client_id` header remains active.
- SessionStorage is checked before localStorage for client ID and existing SSO token values.
- Existing SSO SBI access tokens continue to be sent as `Authorization: Bearer <token>`.
- Standard request encryption remains active when `encrypt: true`.
- Standard response decryption remains active when `decrypt: true`.
- Specialized junk-data AES-128 decryption remains active.
- Baseline security response headers remain active.
- Centralized safe API error messages remain active.


### Rendering impact

The removal fixes the root rendering limitation created by the global CSRF gate.


Before:
Initial document HTML showed only the secure-session loader.
Header, page content and Footer appeared only after browser-side CSRF initialization.

Now:
Static marketing content, Header and Footer render immediately in the initial HTML.
Next.js App Router scripts and `self.__next_f.push(...)` payloads remain normal framework output.


The site remains a hybrid Next.js application:


Metadata and static marketing content → Server-rendered
Blog API records                    → Client-fetched after hydration
Interactive forms                   → Client Components
SSO/sessionStorage journeys         → Client Components


Do not claim the full website is SSR. Public Blog/Product/CMS records require a future server-side service or Next.js BFF/Route Handler before their data appears in initial HTML.

### JWT migration status

JWT is the approved future direction but is **blocked by the missing AppSec/backend contract**. Do not invent or hardcode a token flow. Required information:


1. Token-generation endpoint and method
2. Request headers and payload
3. Success and failure response schemas
4. Token purpose: application, visitor or authenticated customer
5. APIs that require the JWT
6. Authorization header or cookie transport
7. Approved browser/server storage
8. Expiry and refresh/renewal behavior
9. Expired-token behavior
10. Whether JWT replaces client_id, SSO token, CSRF only, or other controls
11. Whether token request/response uses existing AES protection
12. Local, UAT and production configuration
13. CORS and credentials requirements


Security rule:


Authorization-header JWT → Browser does not attach it automatically; classic cookie CSRF is generally not the same concern.
Cookie-based JWT          → Browser attaches it automatically; an approved anti-forgery strategy may still be required.


### Current validation result


- No active `csrf` references under src, scripts or .env.example.
- No active XSRF-TOKEN references.
- Local, UAT and production environment validation passed.
- Lint passed.
- Local, UAT and production builds passed.
- Blog, junk-name cache, Demat, SSO, Realty, GTM and accessibility controls were functionally checked.
- `main` and `uat` have no file differences after synchronization.


### Next implementation phase

The Marcom Figma is now available. Before coding, perform a design handoff audit using the protected-company workflow:


- Full-page desktop export at original frame size
- Full-page mobile export at original frame size
- Tablet export when available
- Original frame widths
- Separately exported SVG/image assets
- Font families and weights
- Light/dark variants
- Interaction notes


Build one section at a time, preserve WCAG 2.2 AA, prefer Server Components, and use Client Components only for actual browser interaction or client-side secured flows.

