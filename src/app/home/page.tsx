import HomeComponent from "@/components/home/HomeComponent";
import { BRAND } from "@/constants/sbi-home";
import { pageMetadata } from "@/lib/seo";

const TITLE = `${BRAND.name} — Smart Investing with Free Intraday Trading`;
const DESCRIPTION =
  "Open a demat account with SBI Securities and trade equity, IPOs, derivatives, ETFs and mutual funds. Free intraday trading, 0% interest on MTF for 23 days and research you can trust.";

export const metadata = {
  ...pageMetadata({ path: "home", title: TITLE, description: DESCRIPTION }),
  // The layout template appends the site name; this page carries its own.
  title: { absolute: TITLE },
};

export default function HomePage() {
  return <HomeComponent />;
}
