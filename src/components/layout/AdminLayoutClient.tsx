"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

/**
 * Protected administrator layout component.
 *
 * Restricts access to users with the administrator role
 * and redirects unauthorized users to the home page.
 *
 * Displays child content only when the authenticated user
 * has administrator privileges.
 *
 * @param props Layout properties.
 * @param props.children Protected administrator content.
 * @returns Administrator layout component.
 */
export default function AdminLayoutClient({
    children 
}:{
    children: React.ReactNode
}){
  
  const { user, isLoading } = useAuth();
  const router = useRouter()

  useEffect( () => {    
    const isAdmin = user?.roles.some(role => role.name === "administrator")
    if (!isLoading && !isAdmin){
      router.push("/")
    }
  },[user, isLoading, router])

  if (isLoading) {return null}
  
  return ( 
    <>
        {children}
    </>
  );
}