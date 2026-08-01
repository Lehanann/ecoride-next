import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  weight:['100','200','300','400', '500', '600', '700','800','900'],
  subsets:['latin']
})

export const metadata: Metadata = {
  title: "Ecoride",
  description: "website of carpooling ecoresponsable",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <main className="bg-[var(--color-secondary)]/40 min-h-screen flex items-center justify-center">
        {children}        
      </main>
   
  );
}
