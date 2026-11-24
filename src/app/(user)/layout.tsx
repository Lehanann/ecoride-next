import type { Metadata } from "next";
import "../globals.css";
import UserLayoutClient from "@/components/layout/UserLayoutClient";

export const metadata: Metadata = {
  title: "Ecoride",
  description: "website of carpooling ecoresponsable",
};

/**
 * User dashboard layout.
 *
 * Provides a protected layout for authenticated users
 * and wraps dashboard pages with user access control.
 *
 * @param props Layout properties.
 * @param props.children Dashboard page content.
 * @returns User dashboard layout component.
 */
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
