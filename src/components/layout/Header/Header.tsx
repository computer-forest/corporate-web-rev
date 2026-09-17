
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";

const navItems = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Products",
        href: "/products",
    },
    {
        label: "Calculators",
        href: "/calculators",
    },
    {
        label: "Blogs",
        href: "/blogs",
    },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <header className={styles.siteHeader}>
            <nav
                className="navbar navbar-expand-lg navbar-light"
                aria-label="Primary navigation"
            >
                <div className="container">
                    <Link href="/" className={`navbar-brand ${styles.logo}`}>
                        SBI Securities
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#primaryNavbar"
                        aria-controls="primaryNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation menu"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="primaryNavbar">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {navItems.map((item) => {
                                const isActive =
                                    item.href === "/"
                                        ? pathname === "/"
                                        : pathname.startsWith(item.href);

                                return (
                                    <li className="nav-item" key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`nav-link ${styles.navLink} ${isActive ? styles.activeNavLink : ""
                                                }`}
                                            aria-current={isActive ? "page" : undefined}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}

                            <li className="nav-item">
                                <button
                                    type="button"
                                    className={`nav-link ${styles.navLink} ${styles.accessibilityButton}`}
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#accessibilityPanel"
                                    aria-controls="accessibilityPanel"
                                    aria-label="Open accessibility options"
                                >
                                    Accessibility
                                </button>
                            </li>
                        </ul>

                        <div className="d-flex flex-column flex-lg-row gap-2 ms-lg-3">
                            <Link href="/sso-realty" className="btn btn-outline-primary">
                                Login
                            </Link>

                            <Link href="/demat-form-test" className="btn btn-primary">
                                Open Demat A/C
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
