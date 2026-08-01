import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import RootLayoutClient from "@/components/layout/RootLayoutClient";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  weight:['100','200','300','400', '500', '600', '700','800','900'],
  subsets:['latin']
})

export const metadata: Metadata = {
  title: "Ecoride",
  description: "website of carpooling ecoresponsable",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={cn("h-full", "antialiased", poppins.className, "font-sans", inter.variable)}
    >
      <body className="min-h-full ">
        <RootLayoutClient>
        {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
