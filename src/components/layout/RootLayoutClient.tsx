"use client";

import React from "react";
import { usePathname } from "next/navigation";

import Header from '@/components/layout/Header';
import Footer from "./Footer";

/**
 * Root client layout component.
 *
 * Provides the common application layout and conditionally
 * displays the header and footer depending on the current route.
 *
 * Authentication pages are rendered without the standard
 * application navigation and footer.
 *
 * @param props Layout properties.
 * @param props.children Page content.
 * @returns Root client layout component.
 */
export default function RootLayoutClient({ 
    children, 
}:Readonly<{
    children: React.ReactNode
}>){
    
  const pathname = usePathname();

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  return (
    <div className="min-h-full flex flex-col">
      {!isAuthPage && <Header />}
      {children}
      {!isAuthPage && <Footer />}  
    </div>
  );
}