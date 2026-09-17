
"use client";

import { useEffect } from "react";
import { useLoader } from "@/context/LoaderContext";
import { registerLoader } from "@/services/api/loaderService";

export default function LoaderRegistration() {
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    registerLoader({
      showLoader,
      hideLoader,
    });
  }, [showLoader, hideLoader]);

  return null;
}


// Why We Need This

// When app starts:
/* LoaderProvider created
        ↓
LoaderRegistration runs
        ↓
registerLoader(...)
        ↓
loaderService gets access
        ↓
Axios Interceptors can trigger loader */

//NOTE:  without LoaderRegistration, loaderService knows nothing about LoaderContext