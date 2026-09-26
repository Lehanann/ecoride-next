"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

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