import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "./lib/lib.utlis";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Care Pulse",
  description: "A healthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <ThemeProvider attribute="class" defaultTheme="dark">
        <body
          className={cn(
            "min-h-screen bg-dark-300 font-sans antialiased",
            fontSans.variable
          )}>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
