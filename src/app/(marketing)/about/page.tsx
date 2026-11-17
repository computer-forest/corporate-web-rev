import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";
import { getAboutContent } from "@/server/cms/aboutContent";
import { seoMetadata } from "@/server/cms/seoMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return seoMetadata((await getAboutContent()).seo, "/about");
}

export default async function About() {
  return <AboutPage content={await getAboutContent()} />;
}
