"use client";

import { useLoader } from "@/context/LoaderContext";
import styles from "./Loader.module.scss";

export default function Loader() {
  const { isLoading } = useLoader();

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={styles.loaderOverlay}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className={styles.loaderContent}>
        <div
          className={styles.spinner}
          aria-hidden="true"
        />

        <span className={styles.loaderText}>
          Loading, please wait...
        </span>
      </div>
    </div>
  );
}