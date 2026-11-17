import { Inter, Poppins } from "next/font/google";

/* Typography/Family/Pre Login/* is Poppins; Typography/Family/Body, the shared
   Pre + Post library, is Inter. Declared once so the home page and the inner
   pages share a single next/font query per family. */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-poppins",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});
