
"use client";

import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null;
}

// Note: 
// Add Bootstrap JavaScript for Mobile Hamburger
// Right now Bootstrap CSS is working, but mobile hamburger needs Bootstrap JS.
// We’ll add it safely using a client component because Bootstrap JS depends on browser APIs like window/document.