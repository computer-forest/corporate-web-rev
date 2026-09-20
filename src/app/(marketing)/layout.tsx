import AccessibilitySidebar from "@/components/accessibility/AccessibilitySidebar/AccessibilitySidebar";
import SalesforceChatbot from "@/components/common/SalesforceChatbot/SalesforceChatbot";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import ValidationDataInitializer from "@/components/common/ValidationDataInitializer/ValidationDataInitializer";
import { isProduction } from "@/config/app.config";
import { getHeaderContent } from "@/server/cms/siteChrome";

/**
 * Async, so the header's copy is read on the server and handed to the bar as
 * props. Header keeps its "use client" marker and all of its behaviour — the
 * menu, the search field, the ⌘K shortcut — it simply stops importing its own
 * copy. Nothing fetches in the browser.
 */
export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = await getHeaderContent();

  return (
    <>
      <ValidationDataInitializer />
      <Header content={header} />
      <AccessibilitySidebar />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      <Footer />
      {isProduction && <SalesforceChatbot />}
    </>
  );
}