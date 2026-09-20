import AccessibilitySidebar from "@/components/accessibility/AccessibilitySidebar/AccessibilitySidebar";
import SalesforceChatbot from "@/components/common/SalesforceChatbot/SalesforceChatbot";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import ValidationDataInitializer from "@/components/common/ValidationDataInitializer/ValidationDataInitializer";
import { isProduction } from "@/config/app.config";
import { getSiteChrome } from "@/server/cms/siteChrome";

/**
 * Async, so the chrome's copy is read on the server and handed to the header
 * and footer as props. Both keep their "use client" markers and all of their
 * behaviour — the dropdowns, the search field, the ⌘K shortcut, the mobile
 * accordions — they simply stop importing their own copy. Nothing fetches in
 * the browser.
 */
export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* One read for both: the header and the footer come from the same
     /api/public/site document, so fetching it twice per page would double
     the CMS's load for nothing. */
  const chrome = await getSiteChrome();

  return (
    <>
      <ValidationDataInitializer />
      <Header content={chrome.header} />
      <AccessibilitySidebar />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      <Footer content={chrome.footer} />
      {isProduction && <SalesforceChatbot />}
    </>
  );
}