import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import ExitModal from "@/components/modals/ExitModal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lingo",
  description: "Interactive language learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${nunito.className} bg-white`}>
          <ThemeProvider defaultTheme="light" attribute="class">

            {children}
            <Toaster />
            <ExitModal />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
