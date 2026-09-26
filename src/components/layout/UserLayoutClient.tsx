"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

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