"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

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