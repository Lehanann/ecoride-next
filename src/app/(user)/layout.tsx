import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import UserLayoutClient from "@/components/layout/UserLayoutClient";


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
      <main className="w-full max-w-[1500px] mx-auto py-12">
        <UserLayoutClient>
          {children}
        </UserLayoutClient>                
      </main> 
  );
}
