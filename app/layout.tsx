import AppQueryProvider from "@/providers/query-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Intra Software - Innovative Solutions for Modern Businesses",
  description:
    "Intra Software is a leading software consultancy agency specializing in website development, institution management systems, and custom software development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className}`}>
        <AppQueryProvider>{children}</AppQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
