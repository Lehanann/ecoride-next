import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  weight:['100','200','300','400', '500', '600', '700','800','900'],
  subsets:['latin']
})

export const metadata: Metadata = {
  title: "Ecoride",
  description: "website of carpooling ecoresponsable",
};

/**
* Root application layout.
*
* Defines the global application structure and provides:
* - Global styling.
* - Font configuration.
* - Authentication context.
* - Toast notifications.
* - Shared application layout.
*
* @param props Layout properties.
* @param props.children Application page content.
* @returns Root application layout component.
*/
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
      <body className="h-full">        
        <AuthProvider>          
            <RootLayoutClient>
              {children}            
            <Toaster 
              position="top-right"
              richColors
              closeButton
            />
          </RootLayoutClient>
        </AuthProvider>      
      </body>
    </html>
  );
}
