import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notion",
  description: "Workspace where you can organize your thoughts in a faster and elegant way",
  icons : {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/notion.png",
        href: "/notion.png"
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/notion-dark.png",
        href: "/notion-dark.png"
      },
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html> )
}
