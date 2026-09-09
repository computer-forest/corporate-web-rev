import AboutComponent from "@/components/about/AboutComponent";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "about",
  title: "The practice",
  description:
    "Fathom Grid is an offshore transmission engineering practice of fifty-four engineers across Aberdeen, Rotterdam and Taipei.",
});

export default function AboutPage() {
  return <AboutComponent />;
}
