import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eugene Portfolio | UI/UX Designer & Developer",
  description:
    "Kenya-based product designer crafting thoughtful solutions for a global audience. UI/UX Design, Web Design, Branding & Development.",
  keywords: [
    "Eugene",
    "Portfolio",
    "UI/UX Designer",
    "Developer",
    "Kenya",
    "Product Design",
    "Web Design",
    "Branding",
  ],
  authors: [{ name: "Eugene Kihara" }],
  openGraph: {
    title: "Eugene Portfolio | UI/UX Designer & Developer",
    description:
      "Kenya-based product designer crafting thoughtful solutions for a global audience.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eugene Portfolio | UI/UX Designer & Developer",
    description:
      "Kenya-based product designer crafting thoughtful solutions for a global audience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
