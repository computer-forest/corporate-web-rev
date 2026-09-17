
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Products",

  description:
    "Explore investment and trading products offered by SBI Securities to support your financial goals.",

  alternates: {
    canonical: "/products",
  },

  openGraph: {
    type: "website",
    url: "/products",
    title: "Investment Products | SBI Securities",
    description:
      "Explore investment and trading products offered by SBI Securities to support your financial goals.",
    siteName: "SBI Securities",
    locale: "en_IN",
  },
};

export default function ProductsPage() {
  return (
    <section className="section-padding">
      <div className="container">
        <h1>Products</h1>
        <p>Product listing page will be CMS/API-driven.</p>
      </div>
    </section>
  );
}
