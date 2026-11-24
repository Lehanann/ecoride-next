"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

/**
 * Protected user layout component.
 *
 * Restricts access to authenticated users and redirects
 * unauthenticated visitors to the home page.
 *
 * Displays child content only when a valid user session
 * is available.
 *
 * @param props Layout properties.
 * @param props.children Protected page content.
 * @returns Protected user layout component.
 */
export default function UserLayoutClient({
    children 
}:{
    children: React.ReactNode
}){

  const { user, isLoading } = useAuth();

  const router = useRouter()

  useEffect( () => {
    if (!isLoading && !user){
      router.push("/")
    }
  },[user, isLoading, router])

  if (isLoading) {return null}
  
  if (!user){ return <p>Utilisateur non connecté</p>}
    
  return ( 
    <>
        {children}
    </>
  );
}