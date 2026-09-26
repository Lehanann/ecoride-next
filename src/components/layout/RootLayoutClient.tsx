"use client";

import { usePathname } from "next/navigation";
import Header from '@/components/layout/Header';
import Footer from "./Footer";
import React from "react";

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