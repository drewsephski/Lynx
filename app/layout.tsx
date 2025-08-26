import type { Metadata } from "next";
import PlausibleProvider from "next-plausible";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

let title = "Lynx – AI Code Generator";
let description = "Generate your next app with lightning-fast AI. Powered by Llama 3.1 405B";
let url = "https://lynx.ai/";
let ogimage = "https://lynx.ai/og-image.png";
let sitename = "lynx.ai";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <PlausibleProvider domain="lynx.ai" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
