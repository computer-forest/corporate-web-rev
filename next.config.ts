import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "usb=()",
      "payment=()",
      "browsing-topics=()",
    ].join(", "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;


// default one 
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


// 1- What These Headers Do ?

// X-Content-Type-Options: nosniff
// → Prevents browsers from guessing file content types.

// Referrer-Policy: strict-origin-when-cross-origin
// → Prevents full sensitive paths, such as SSO URLs,
//   from normally being sent to external websites.

// X-Frame-Options: SAMEORIGIN
// → Allows the SBI website to be framed only by the
//   same origin, reducing clickjacking risk.

// Permissions-Policy
// → Blocks browser capabilities that the website
//   currently does not need.


// 2- Intentionally Not Added Yet ?

// Content-Security-Policy
// → Requires final Salesforce domain discovery.

// Strict-Transport-Security
// → Best configured and verified at the production
//   reverse proxy/load balancer level.

// Cross-Origin-Opener-Policy
// → Could affect popup-based Demat or SSO behavior.

// Cross-Origin-Embedder-Policy
// → Could block Salesforce and other third-party assets.
