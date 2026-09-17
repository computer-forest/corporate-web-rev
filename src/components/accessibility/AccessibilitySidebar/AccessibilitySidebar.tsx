
"use client";

import { useAccessibility } from "@/context/AccessibilityContext";
import styles from "./AccessibilitySidebar.module.scss";

export default function AccessibilitySidebar() {
    const {
        theme,
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        toggleTheme,
    } = useAccessibility();

    const isDarkTheme = theme === "dark";

    return (
        <aside
            className={`offcanvas offcanvas-end ${styles.sidebarPanel}`}
            tabIndex={-1}
            id="accessibilityPanel"
            aria-labelledby="accessibilityPanelTitle"
        >
            <div className="offcanvas-header">
                <h2 className={`offcanvas-title h5 ${styles.sidebarTitle}`} id="accessibilityPanelTitle">
                    Accessibility Options
                </h2>


                <button
                    type="button"
                    className={`btn-close ${styles.closeButton}`}
                    data-bs-dismiss="offcanvas"
                    aria-label="Close accessibility options"
                />

            </div>

            <div className="offcanvas-body">
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Font Size</h3>

                    <p className={styles.helperText}>
                        Current font size: {fontSize}px
                    </p>

                    <div
                        className={styles.buttonGroup}
                        role="group"
                        aria-label="Font size controls"
                    >
                        <button
                            type="button"
                            className={styles.controlButton}
                            onClick={decreaseFontSize}
                            aria-label="Decrease font size"
                        >
                            A-
                        </button>

                        <button
                            type="button"
                            className={styles.controlButton}
                            onClick={resetFontSize}
                            aria-label={`Reset font size. Current font size is ${fontSize}px`}
                        >
                            A
                        </button>

                        <button
                            type="button"
                            className={styles.controlButton}
                            onClick={increaseFontSize}
                            aria-label="Increase font size"
                        >
                            A+
                        </button>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Theme</h3>

                    <button
                        type="button"
                        className={styles.themeButton}
                        onClick={toggleTheme}
                        aria-pressed={isDarkTheme}
                        aria-label={
                            isDarkTheme ? "Switch to light theme" : "Switch to dark theme"
                        }
                    >
                        {isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
                    </button>
                </div>
            </div>
        </aside>
    );
}
