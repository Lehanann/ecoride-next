"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

/**
 * Protected employee layout component.
 *
 * Restricts access to users with the employee role
 * and redirects unauthorized users to the home page.
 *
 * Displays child content only when the authenticated user
 * has employee privileges.
 *
 * @param props Layout properties.
 * @param props.children Protected employee content.
 * @returns Employee layout component.
 */
export default function EmployeeLayoutClient({
    children 
}:{
    children: React.ReactNode
}){

  const { user, isLoading } = useAuth();
  const router = useRouter()

  useEffect( () => {
    const isEmployee = user?.roles.some(role => role.name === "employee")
    if (!isLoading && !isEmployee){
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