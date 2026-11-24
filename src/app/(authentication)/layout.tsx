import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Ecoride",
  description: "website of carpooling ecoresponsable",
};

/**
 * Authentication layout.
 *
 * Provides a dedicated layout for authentication pages
 * such as login and registration.
 *
 * Centers the page content and applies the authentication
 * area styling.
 *
 * @param props Layout properties.
 * @param props.children Authentication page content.
 * @returns Authentication layout component.
 */
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
