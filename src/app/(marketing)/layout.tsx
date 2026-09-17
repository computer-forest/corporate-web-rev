import AccessibilitySidebar from "@/components/accessibility/AccessibilitySidebar/AccessibilitySidebar";
import SalesforceChatbot from "@/components/common/SalesforceChatbot/SalesforceChatbot";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import ValidationDataInitializer from "@/components/common/ValidationDataInitializer/ValidationDataInitializer";
import { isProduction } from "@/config/app.config";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ValidationDataInitializer />
      <Header />
      <AccessibilitySidebar />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      <Footer />
      {isProduction && <SalesforceChatbot />}
    </>
  );
}