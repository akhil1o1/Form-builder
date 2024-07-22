import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";

import { Separator } from "@/components/ui/separator";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Form builder",
   description: "Build forms in seconds",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <header className="px-4 pt-6 mb-2">
              <Link href="/" className="text-2xl lg:text-3xl font-bold text-neutral-700 tracking-tight">
              Form Builder
              </Link>
            </header>
            <Separator/>
            <main>{children}</main>
         </body>
      </html>
   );
}
