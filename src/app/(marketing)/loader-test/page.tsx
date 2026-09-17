
"use client";

import { useLoader } from "@/context/LoaderContext";

export default function LoaderTestPage() {
  const { showLoader, hideLoader } = useLoader();

  const handleLoaderTest = () => {
    showLoader();

    setTimeout(() => {
      hideLoader();
    }, 3000);
  };

  return (
    <section className="section-padding">
      <div className="container">
        <h1>Loader Test</h1>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLoaderTest}
        >
          Show Loader For 3 Seconds
        </button>
      </div>
    </section>
  );
}
