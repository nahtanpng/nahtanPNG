import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { profile } from "@/data/profile";
import { SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${profile.name}`,
  },
  description: profile.bio.lead,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: `https://github.com/${profile.githubLogin}` }],
  creator: profile.name,
  keywords: [
    profile.name,
    profile.githubLogin,
    profile.role,
    "Software Engineer",
    "Web Developer",
    "TypeScript",
    "React",
    "Next.js",
    "Nest.js",
    "Node.js",
    "Portfolio",
    profile.location,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    locale: "en_US",
    title: SITE_TITLE,
    description: profile.bio.lead,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: profile.bio.lead,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0b" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body id="top" className="min-h-screen bg-bg font-sans text-fg">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
