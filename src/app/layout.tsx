import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { NextAuthProvider } from "@/components/providers/next-auth-provider";
import { MarqueeBanner } from "@/components/marquee-banner";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        <SmoothScrollProvider>
          <NextAuthProvider>
            <div className="flex flex-col min-h-screen">
              <div className="flex-1">{children}</div>
              <MarqueeBanner />
              <SiteFooter />
            </div>
          </NextAuthProvider>
          <Toaster />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
